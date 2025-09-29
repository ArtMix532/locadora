package com.example.locadora.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.locadora.models.Carro;

@Repository
public interface CarroRepository extends JpaRepository<Carro, Long> {

    // Buscar por placa (única)
    Optional<Carro> findByPlaca(String placa);

    // Buscar por matrícula (única)
    Optional<Carro> findByMatricula(String matricula);

    // Buscar por modelo (ignora maiúsculas/minúsculas)
    List<Carro> findByModeloContainingIgnoreCase(String modelo);

    // Buscar por marca
    List<Carro> findByMarcaContainingIgnoreCase(String marca);

    // Buscar por disponibilidade
    List<Carro> findByDisponivelTrue();

    List<Carro> findByDisponivelFalse();
}
