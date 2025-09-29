package com.example.locadora.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.locadora.models.Carro;
import com.example.locadora.repositories.CarroRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CarroService {

    private final CarroRepository carroRepository;

    public CarroService(CarroRepository carroRepository) {
        this.carroRepository = carroRepository;
    }

    @Transactional
    public Carro create(Carro carro) {
        return carroRepository.save(carro);
    }

    @Transactional(readOnly = true)
    public Carro getById(Long id) {
        return carroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Carro não encontrado: " + id));
    }

    @Transactional(readOnly = true)
    public List<Carro> listAll() {
        return carroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Carro> listDisponiveis() {
        return carroRepository.findByDisponivelTrue();
    }

    @Transactional
    public Carro update(Long id, Carro dados) {
        Carro existente = getById(id);
        existente.setMatricula(dados.getMatricula());
        existente.setModelo(dados.getModelo());
        existente.setMarca(dados.getMarca());
        existente.setPlaca(dados.getPlaca());
        existente.setAno(dados.getAno());
        existente.setDisponivel(dados.getDisponivel());
        return carroRepository.save(existente);
    }

    @Transactional
    public void delete(Long id) {
        Carro existente = getById(id);
        carroRepository.delete(existente);
    }

    @Transactional
    public Carro alterarDisponibilidade(Long id, boolean disponivel) {
        Carro carro = getById(id);
        carro.setDisponivel(disponivel);
        return carroRepository.save(carro);
    }
}
