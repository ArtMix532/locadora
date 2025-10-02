package com.example.locadora.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.locadora.enums.StatusLocacao;
import com.example.locadora.models.Carro;
import com.example.locadora.models.Locacao;
import com.example.locadora.models.User;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long> {

    @EntityGraph(attributePaths = {"cliente", "agente", "carro"})
    List<Locacao> findAll();

    @EntityGraph(attributePaths = {"cliente", "agente", "carro"})
    Optional<Locacao> findById(Long id);

    // Buscar locações de um cliente
    List<Locacao> findByCliente(User cliente);

    // Buscar locações de um cliente pelo ID
    List<Locacao> findByClienteId(Long clienteId);

    // Buscar locações de um agente
    List<Locacao> findByAgente(User agente);

    // Buscar locações de um agente pelo ID
    List<Locacao> findByAgenteId(Long agenteId);

    // Buscar locações de um carro
    List<Locacao> findByCarro(Carro carro);

    // Buscar locações de um carro pelo ID
    List<Locacao> findByCarroId(Long carroId);

    // Buscar locações por status
    List<Locacao> findByStatus(StatusLocacao status);

    // Buscar locações ativas em um período
    List<Locacao> findByRetiradaBeforeAndDevolucaoAfter(LocalDateTime retirada, LocalDateTime devolucao);

    // Buscar todas as locações previstas para retirada depois de uma data
    List<Locacao> findByRetiradaAfter(LocalDateTime retirada);

    // Buscar todas as locações com devolução antes de uma data
    List<Locacao> findByDevolucaoBefore(LocalDateTime devolucao);
}
