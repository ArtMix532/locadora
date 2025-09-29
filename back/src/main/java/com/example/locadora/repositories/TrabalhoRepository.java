package com.example.locadora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.locadora.models.Trabalho;
import com.example.locadora.models.User;

@Repository
public interface TrabalhoRepository extends JpaRepository<Trabalho, Long> {

    // Buscar todos os trabalhos de um usuário específico
    List<Trabalho> findByUser(User user);

    // Buscar todos os trabalhos de um usuário pelo ID do usuário
    List<Trabalho> findByUserId(Long userId);

    // Buscar trabalhos por cargo
    List<Trabalho> findByCargoContainingIgnoreCase(String cargo);

    // Buscar trabalhos por empresa
    List<Trabalho> findByEmpresaContainingIgnoreCase(String empresa);
}
