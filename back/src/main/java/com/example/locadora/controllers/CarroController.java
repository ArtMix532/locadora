package com.example.locadora.controllers;

import java.net.URI;
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

import com.example.locadora.models.Carro;
import com.example.locadora.services.CarroService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/carros")
public class CarroController {

    private final CarroService service;

    public CarroController(CarroService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Carro> create(@Valid @RequestBody Carro body) {
        Carro created = service.create(body);
        return ResponseEntity.created(URI.create("/api/carros/" + created.getId()))
                             .body(created);
    }

    // READ - all
    @GetMapping
    public ResponseEntity<List<Carro>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }

    // READ - by id
    @GetMapping("/{id}")
    public ResponseEntity<Carro> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // READ - disponíveis
    @GetMapping("/disponiveis")
    public ResponseEntity<List<Carro>> listDisponiveis() {
        return ResponseEntity.ok(service.listDisponiveis());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Carro> update(@PathVariable Long id,
                                        @Valid @RequestBody Carro body) {
        return ResponseEntity.ok(service.update(id, body));
    }

    // PATCH disponibilidade
    @PatchMapping("/{id}/disponibilidade")
    public ResponseEntity<Carro> patchDisponibilidade(@PathVariable Long id,
                                                      @RequestParam boolean disponivel) {
        return ResponseEntity.ok(service.alterarDisponibilidade(id, disponivel));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Void> notFound(EntityNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }
}
