package com.example.locadora.services;

import com.example.locadora.models.Trabalho;
import com.example.locadora.models.User;
import com.example.locadora.repositories.TrabalhoRepository;
import com.example.locadora.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrabalhoService {

    private final TrabalhoRepository trabalhoRepository;
    private final UserRepository userRepository;

    public TrabalhoService(TrabalhoRepository trabalhoRepository, UserRepository userRepository) {
        this.trabalhoRepository = trabalhoRepository;
        this.userRepository = userRepository;
    }

    // Criar trabalho vinculado a um usuário
    public Trabalho createTrabalho(Long userId, Trabalho trabalho) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com id: " + userId));

        trabalho.setUser(user);
        return trabalhoRepository.save(trabalho);
    }

    // Listar todos os trabalhos
    public List<Trabalho> getAllTrabalhos() {
        return trabalhoRepository.findAll();
    }

    // Buscar trabalho por ID
    public Trabalho getTrabalhoById(Long id) {
        return trabalhoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trabalho não encontrado com id: " + id));
    }

    // Listar trabalhos de um usuário
    public List<Trabalho> getTrabalhosByUserId(Long userId) {
        return trabalhoRepository.findByUserId(userId);
    }

    // Atualizar trabalho
    public Trabalho updateTrabalho(Long id, Trabalho trabalhoAtualizado) {
        Trabalho existente = trabalhoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trabalho não encontrado com id: " + id));

        existente.setCargo(trabalhoAtualizado.getCargo());
        existente.setEmpresa(trabalhoAtualizado.getEmpresa());
        existente.setComeco(trabalhoAtualizado.getComeco());
        existente.setTermino(trabalhoAtualizado.getTermino());
        existente.setSalario(trabalhoAtualizado.getSalario());

        return trabalhoRepository.save(existente);
    }

    // Deletar trabalho
    public void deleteTrabalho(Long id) {
        Trabalho existente = trabalhoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trabalho não encontrado com id: " + id));
        trabalhoRepository.delete(existente);
    }
}
