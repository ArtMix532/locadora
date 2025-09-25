// src/main/java/com/example/locadora/controllers/EnderecoController.java
package com.example.locadora.controllers;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.locadora.models.Endereco;
import com.example.locadora.services.EnderecoService;

import jakarta.validation.Valid;

@RestController
@Validated
public class EnderecoController {

    private final EnderecoService service;

    public EnderecoController(EnderecoService service) {
        this.service = service;
    }

    /* ------------ Por USUÁRIO (1:1) ------------ */

    /** Busca o endereço do usuário (404 se não existir) */
    @GetMapping("/users/{userId}/endereco")
    public Endereco getByUser(@PathVariable Long userId) {
        return service.getByUserOr404(userId);
    }

    /** Cria endereço para o usuário que ainda não tem (422 se já existir) */
    @PostMapping("/users/{userId}/endereco")
    public ResponseEntity<Endereco> createForUser(@PathVariable Long userId,
                                                  @Valid @RequestBody Endereco body) {
        var saved = service.createForUser(userId, body);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .build(saved.getId());
        return ResponseEntity.created(location).body(saved);
    }

    /** Atualiza (ou cria, se não existir) o endereço do usuário */
    @PutMapping("/users/{userId}/endereco")
    public Endereco upsertForUser(@PathVariable Long userId,
                                  @Valid @RequestBody Endereco body) {
        return service.upsertForUser(userId, body);
    }

    /** Remove o endereço do usuário (404 se não houver) */
    @DeleteMapping("/users/{userId}/endereco")
    public ResponseEntity<Void> deleteByUser(@PathVariable Long userId) {
        service.deleteByUser(userId);
        return ResponseEntity.noContent().build();
    }

    /* ------------ Por ID do ENDEREÇO ------------ */

    /** Busca por ID do endereço */
    @GetMapping("/enderecos/{id}")
    public Endereco getById(@PathVariable Long id) {
        return service.getByIdOr404(id);
    }

    /** Atualiza por ID do endereço (não muda o user aqui) */
    @PutMapping("/enderecos/{id}")
    public Endereco updateById(@PathVariable Long id,
                               @Valid @RequestBody Endereco body) {
        return service.updateById(id, body);
    }

    /** Remove por ID do endereço */
    @DeleteMapping("/enderecos/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
