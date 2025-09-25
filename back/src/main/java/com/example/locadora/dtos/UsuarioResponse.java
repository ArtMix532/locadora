// src/main/java/com/example/locadora/dtos/UsuarioResponse.java
package com.example.locadora.dtos;

import com.example.locadora.enums.NivelAcesso;

public record UsuarioResponse(
    Long id,
    String nome,
    String email,
    String rg,
    String cpf,
    String profissao,
    NivelAcesso nivelAcesso
) {}
