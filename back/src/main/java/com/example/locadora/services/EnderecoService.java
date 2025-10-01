// src/main/java/com/example/locadora/services/EnderecoService.java
package com.example.locadora.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.locadora.models.Endereco;
import com.example.locadora.models.User;
import com.example.locadora.repositories.EnderecoRepository;
import com.example.locadora.repositories.UserRepository;

@Service
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;
    private final UserRepository userRepository;

    public EnderecoService(EnderecoRepository enderecoRepository, UserRepository userRepository) {
        this.enderecoRepository = enderecoRepository;
        this.userRepository = userRepository;
    }

    /* Helpers */
    private User userOr404(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado: " + userId));
    }

    private Endereco copyFields(Endereco src, Endereco dst) {
        dst.setId(src.getId());
        dst.setRua(src.getRua());
        dst.setNumero(src.getNumero());
        dst.setCidade(src.getCidade());
        dst.setEstado(src.getEstado());
        dst.setCep(src.getCep());
        dst.setComplemento(src.getComplemento());
        return dst;
    }

    /* CRUD + regras 1:1 */

    @Transactional(readOnly = true)
    public Endereco getByIdOr404(Long enderecoId) {
        return enderecoRepository.findById(enderecoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Endereço não encontrado: " + enderecoId));
    }

    @Transactional(readOnly = true)
    public Endereco getByUserOr404(Long userId) {
        return enderecoRepository.findByUserId(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário sem endereço cadastrado: " + userId));
    }

    /** Cria endereço para um usuário que ainda não tem (1:1). */
    @Transactional
    public Endereco createForUser(Long userId, Endereco data) {
        var user = userOr404(userId);
        if (enderecoRepository.existsByUserId(userId)) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Usuário já possui endereço");
        }
        var novo = new Endereco();
        copyFields(data, novo);
        novo.setUser(user);          // << VINCULA AQUI
        novo.setId(null);            // garante INSERT
        return enderecoRepository.save(novo);
    }

    /** Atualiza o endereço do usuário (cria se não existir, se preferir, troque para lançar 404). */
    @Transactional
    public Endereco upsertForUser(Long userId, Endereco data) {
        var user = userOr404(userId);
        var endereco = enderecoRepository.findByUserId(userId)
            .map(e -> copyFields(data, e))
            .orElseGet(() -> {
                var e = new Endereco();
                copyFields(data, e);
                e.setUser(user);
                return e;
            });
        return enderecoRepository.save(endereco);
    }

    /** Atualiza por ID do endereço. */
    @Transactional
    public Endereco updateById(Long enderecoId, Endereco data) {
        var existente = getByIdOr404(enderecoId);
        copyFields(data, existente);
        // não permita trocar o usuário por aqui; se precisar, crie método específico controlando regra 1:1
        return enderecoRepository.save(existente);
    }

    /** Remove o endereço do usuário. */
    @Transactional
    public void deleteByUser(Long userId) {
        userOr404(userId); // valida existência do usuário
        if (!enderecoRepository.existsByUserId(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não possui endereço");
        }
        enderecoRepository.deleteByUserId(userId);
    }

    /** Remove por ID do endereço. */
    @Transactional
    public void deleteById(Long enderecoId) {
        var e = getByIdOr404(enderecoId);
        enderecoRepository.delete(e);
    }

    public Optional<Endereco> findByUser(Long userId) {
        return enderecoRepository.findByUserId(userId); // Optional.empty() se não existir
    }
}
