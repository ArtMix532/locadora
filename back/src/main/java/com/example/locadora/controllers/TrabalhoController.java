package com.example.locadora.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.locadora.models.Trabalho;
import com.example.locadora.services.TrabalhoService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class TrabalhoController {

    private final TrabalhoService trabalhoService;

    public TrabalhoController(TrabalhoService trabalhoService) {
        this.trabalhoService = trabalhoService;
    }

    // -----------------------
    // CREATE (por usuário)
    // -----------------------
    @PostMapping("/users/{userId}/trabalhos")
    public ResponseEntity<Trabalho> create(@PathVariable Long userId,
                                           @Valid @RequestBody Trabalho body) {
        Trabalho created = trabalhoService.createTrabalho(userId, body);
        return ResponseEntity
                .created(URI.create("/api/trabalhos/" + created.getId()))
                .body(created);
    }

    // -----------------------
    // READ - listar todos
    // -----------------------
    @GetMapping("/trabalhos")
    public ResponseEntity<List<Trabalho>> findAll() {
        return ResponseEntity.ok(trabalhoService.getAllTrabalhos());
    }

    // -----------------------
    // READ - por id
    // -----------------------
    @GetMapping("/trabalhos/{id}")
    public ResponseEntity<Trabalho> findById(@PathVariable Long id) {
        return ResponseEntity.ok(trabalhoService.getTrabalhoById(id));
    }

    // -----------------------
    // READ - por usuário
    // -----------------------
    @GetMapping("/users/{userId}/trabalhos")
    public ResponseEntity<List<Trabalho>> findByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(trabalhoService.getTrabalhosByUserId(userId));
    }

    // -----------------------
    // UPDATE (PUT total)
    // -----------------------
    @PutMapping("/trabalhos/{id}")
    public ResponseEntity<Trabalho> update(@PathVariable Long id,
                                           @Valid @RequestBody Trabalho body) {
        return ResponseEntity.ok(trabalhoService.updateTrabalho(id, body));
    }

    // -----------------------
    // DELETE
    // -----------------------
    @DeleteMapping("/trabalhos/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        trabalhoService.deleteTrabalho(id);
        return ResponseEntity.noContent().build();
    }

    // (Opcional) Tratamento simples de not found
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }
}
