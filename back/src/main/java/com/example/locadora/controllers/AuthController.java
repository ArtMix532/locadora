package com.example.locadora.controllers;

import com.example.locadora.dtos.LoginRequest;
import com.example.locadora.dtos.LoginResponse;
import com.example.locadora.models.User;
import com.example.locadora.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;
  public AuthController(AuthService authService) { this.authService = authService; }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest body) {
    User u = authService.authenticate(body.email(), body.password());
    return ResponseEntity.ok(new LoginResponse(u.getId(), u.getNome(), u.getEmail(), u.getNivelAcesso()));
  }
}
