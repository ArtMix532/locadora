// AuthController.java
package com.example.locadora.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import com.example.locadora.dtos.LoginRequest;
import com.example.locadora.dtos.LoginResponse;
import com.example.locadora.dtos.UsuarioResponse;
import com.example.locadora.models.User;
import com.example.locadora.repositories.UserRepository;
import com.example.locadora.security.JwtService;
import com.example.locadora.services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;
  private final JwtService jwtService;

  @Autowired
  private UserRepository userRepository;

  public AuthController(AuthService authService, JwtService jwtService) {
    this.authService = authService;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest body) {
    User u = authService.authenticate(body.email(), body.password());
    String token = jwtService.generate(u);                 // << gera o JWT
    return ResponseEntity.ok(
      new LoginResponse(token, "Bearer", jwtService.getExpirationSeconds(),
                        u.getId(), u.getNome(), u.getEmail(), u.getNivelAcesso())
    );
  }

  @GetMapping
  public UsuarioResponse me(Authentication auth) {
    String email = auth.getName();
    var u = userRepository.findByEmail(email).orElseThrow();
    return new UsuarioResponse(u.getId(), u.getNome(), u.getEmail(), u.getRg(), u.getCpf(), u.getProfissao(), u.getNivelAcesso());
  }

}
