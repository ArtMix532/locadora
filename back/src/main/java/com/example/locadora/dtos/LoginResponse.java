// LoginResponse.java
package com.example.locadora.dtos;

import com.example.locadora.enums.NivelAcesso;

public record LoginResponse(
  String accessToken,
  String tokenType,
  long   expiresIn,
  Long   id,
  String nome,
  String email,
  NivelAcesso nivelAcesso
) {}
