package com.example.locadora.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtro que lê o header Authorization: Bearer <token>
 * valida o JWT e popula o SecurityContext.
 * Compatível com JJWT 0.12.x (usa parser().verifyWith(...).build()).
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  public JwtAuthFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {

    String auth = req.getHeader("Authorization");
    if (auth != null && auth.startsWith("Bearer ")) {
      String token = auth.substring(7);
      try {
        var jws    = jwtService.parse(token);      // JJWT 0.12.x
        var claims = jws.getPayload();             // (não é getBody)
        String email = claims.getSubject();
        String role  = (String) claims.get("role");

        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
        var authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      } catch (Exception ignored) {
        // token inválido/expirado -> segue sem auth; endpoints protegidos retornarão 401
      }
    }

    chain.doFilter(req, res);
  }
}
