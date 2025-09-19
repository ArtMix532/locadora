package com.example.locadora.dtos;

import com.example.locadora.enums.NivelAcesso;

public record LoginResponse(
  Long id,
  String nome,
  String email,
  NivelAcesso nivelAcesso
) {}
