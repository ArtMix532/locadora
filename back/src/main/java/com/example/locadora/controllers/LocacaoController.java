package com.example.locadora.controllers;

import java.net.URI;
import java.time.Instant;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.locadora.dtos.LocacaoRequest;
import com.example.locadora.dtos.LocacaoResponse;
import com.example.locadora.enums.StatusLocacao;
import com.example.locadora.models.Locacao;
import com.example.locadora.services.LocacaoService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class LocacaoController {

    private final LocacaoService service;

    public LocacaoController(LocacaoService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping("/locacoes")
    public ResponseEntity<Locacao> create(@Valid @RequestBody LocacaoRequest body) {
        Locacao created = service.create(body);
        return ResponseEntity.created(URI.create("/api/locacoes/" + created.getId()))
                             .body(created);
    }

    // READ - all
    @GetMapping("/locacoes")
    public ResponseEntity<List<LocacaoResponse>> listAll() {
        var out = service.listAll().stream().map(service::toResponse).toList();
        return ResponseEntity.ok(out);
    }

    // READ - by id
    @GetMapping("/locacoes/{id}")
    public ResponseEntity<LocacaoResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.toResponse(service.getById(id)));
    }

    // READ - by cliente
    @GetMapping("/clientes/{clienteId}/locacoes")
    // 2. MUDE O TIPO DE RETORNO para o seu DTO
    public ResponseEntity<List<LocacaoResponse>> listByCliente(@PathVariable Long clienteId) {
        // O corpo do método continua igual, pois o service já retorna o tipo correto
        return ResponseEntity.ok(service.listByCliente(clienteId));
    }

    // READ - by agente
    @GetMapping("/agentes/{agenteId}/locacoes")
    public ResponseEntity<List<LocacaoResponse>> listByAgente(@PathVariable Long agenteId) {
        return ResponseEntity.ok(service.listByAgenteDTO(agenteId));
    }

    // READ - by carro
    @GetMapping("/carros/{carroId}/locacoes")
    public ResponseEntity<List<LocacaoResponse>> listByCarro(@PathVariable Long carroId) {
        return ResponseEntity.ok(service.listByCarroDTO(carroId));
    }

    // READ - by status
    @GetMapping("/locacoes/status/{status}")
    public ResponseEntity<List<LocacaoResponse>> listByStatus(@PathVariable StatusLocacao status) {
        return ResponseEntity.ok(service.listByStatusDTO(status));
    }

    // UPDATE (PUT)
    @PutMapping("/locacoes/{id}")
    public ResponseEntity<Locacao> update(@PathVariable Long id,
                                          @Valid @RequestBody LocacaoRequest body) {
        return ResponseEntity.ok(service.update(id, body));
    }

    // PATCH status
    @PatchMapping("/locacoes/{id}/status")
    public ResponseEntity<Locacao> patchStatus(@PathVariable Long id,
                                               @RequestParam("status") StatusLocacao status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    // Disponibilidade de carro
    @GetMapping("/carros/{carroId}/disponibilidade")
    public ResponseEntity<Boolean> disponibilidade(@PathVariable Long carroId,
                                                   @RequestParam("inicio") Instant inicio,
                                                   @RequestParam("fim") Instant fim) {
        boolean conflito = service.existeConflitoParaCarro(carroId, inicio, fim);
        return ResponseEntity.ok(!conflito);
    }

    // DELETE
    @DeleteMapping("/locacoes/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Not found -> 404
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Void> notFound(EntityNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }
}
