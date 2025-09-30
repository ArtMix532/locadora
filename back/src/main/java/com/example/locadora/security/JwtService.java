package com.example.locadora.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.locadora.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  private final SecretKey key;
  private final long expirationSeconds;

  public JwtService(
      @Value("${security.jwt.secret}") String secret,
      @Value("${security.jwt.expiration:124000}") long expirationSeconds
  ) {
    if (secret == null || secret.length() < 32) {
      throw new IllegalStateException("security.jwt.secret ausente ou curto (<32 chars).");
    }
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expirationSeconds = expirationSeconds;
  }

  public String generate(User u) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(u.getEmail())
        .claim("id", u.getId())
        .claim("role", u.getNivelAcesso().name())
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plusSeconds(expirationSeconds)))
        .signWith(key)               // << sem SignatureAlgorithm na 0.12
        .compact();
  }

  public Jws<Claims> parse(String token) {
    return Jwts.parser()
        .verifyWith(key)             // << substitui parserBuilder().setSigningKey(...)
        .build()
        .parseSignedClaims(token);
  }

  public long getExpirationSeconds() {
    return expirationSeconds;
  }
}
