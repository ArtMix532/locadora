package com.example.locadora.dtos;

import com.example.locadora.models.Endereco;

public record EnderecoDto(
        Long id,
        String rua,
        String numero,
        String cidade,
        String estado,
        String cep,
        String complemento,
        Long userId
) {
    public EnderecoDto(Endereco e) {
        this(
            e.getId(),
            e.getRua(),
            e.getNumero(),
            e.getCidade(),
            e.getEstado(),
            e.getCep(),
            e.getComplemento(),
            e.getUser() != null ? e.getUser().getId() : null
        );
    }
}
