package com.example.locadora.services;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.locadora.dtos.LocacaoRequest;
import com.example.locadora.dtos.LocacaoResponse;
import com.example.locadora.enums.StatusLocacao;
import com.example.locadora.models.Carro;
import com.example.locadora.models.Locacao;
import com.example.locadora.models.User;
import com.example.locadora.repositories.CarroRepository;
import com.example.locadora.repositories.LocacaoRepository;
import com.example.locadora.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LocacaoService {

    private final LocacaoRepository locacaoRepository;
    private final UserRepository userRepository;
    private final CarroRepository carroRepository;

    public LocacaoService(LocacaoRepository locacaoRepository,
                          UserRepository userRepository,
                          CarroRepository carroRepository) {
        this.locacaoRepository = locacaoRepository;
        this.userRepository = userRepository;
        this.carroRepository = carroRepository;
    }

    @Transactional
    public Locacao create(LocacaoRequest req) {
        User cliente = userRepository.findById(req.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + req.getClienteId()));
        User agente = userRepository.findById(req.getAgenteId())
                .orElseThrow(() -> new EntityNotFoundException("Agente não encontrado: " + req.getAgenteId()));
        Carro carro = carroRepository.findById(req.getCarroId())
                .orElseThrow(() -> new EntityNotFoundException("Carro não encontrado: " + req.getCarroId()));

        Locacao l = new Locacao();
        l.setCliente(cliente);
        l.setAgente(agente);
        l.setCarro(carro);
        l.setConsideracaoAgente(req.getConsideracaoAgente());
        l.setRetirada(req.getRetirada());
        l.setDevolucao(req.getDevolucao());
        l.setValorPrevisto(req.getValorPrevisto());
        l.setValorFinal(req.getValorFinal());
        l.setTipo(req.getTipo());
        if (req.getStatus() != null) {
            l.setStatus(req.getStatus());
        }
        return locacaoRepository.save(l);
    }

    @Transactional(readOnly = true)
    public Locacao getById(Long id) {
        return locacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Locação não encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public List<Locacao> listAll() {
        return locacaoRepository.findAll();
    }

    @Transactional(readOnly = true)
public List<LocacaoResponse> listByCliente(Long clienteId) {
    // 1. Busca as entidades do banco de dados
    List<Locacao> locacoes = locacaoRepository.findByClienteId(clienteId);

    // 2. Converte cada entidade `Locacao` para `LocacaoResponse` usando seu método `toResponse`
    return locacoes.stream()
                   .map(this::toResponse) // Usando seu método helper `toResponse`!
                   .toList(); // ou .collect(Collectors.toList());
}

    @Transactional(readOnly = true)
    public List<Locacao> listByAgente(Long agenteId) {
        return locacaoRepository.findByAgenteId(agenteId);
    }

    @Transactional(readOnly = true)
    public List<Locacao> listByCarro(Long carroId) {
        return locacaoRepository.findByCarroId(carroId);
    }

    @Transactional(readOnly = true)
    public List<Locacao> listByStatus(StatusLocacao status) {
        return locacaoRepository.findByStatus(status);
    }

    @Transactional
    public Locacao update(Long id, LocacaoRequest req) {
        Locacao l = getById(id);

        if (req.getClienteId() != null) {
            User cliente = userRepository.findById(req.getClienteId())
                    .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + req.getClienteId()));
            l.setCliente(cliente);
        }
        if (req.getAgenteId() != null) {
            User agente = userRepository.findById(req.getAgenteId())
                    .orElseThrow(() -> new EntityNotFoundException("Agente não encontrado: " + req.getAgenteId()));
            l.setAgente(agente);
        }
        if (req.getCarroId() != null) {
            Carro carro = carroRepository.findById(req.getCarroId())
                    .orElseThrow(() -> new EntityNotFoundException("Carro não encontrado: " + req.getCarroId()));
            l.setCarro(carro);
        }

        l.setConsideracaoAgente(req.getConsideracaoAgente());
        l.setRetirada(req.getRetirada());
        l.setDevolucao(req.getDevolucao());
        l.setValorPrevisto(req.getValorPrevisto());
        l.setValorFinal(req.getValorFinal());
        if (req.getTipo() != null) {
            l.setTipo(req.getTipo());
        }
        if (req.getStatus() != null) {
            l.setStatus(req.getStatus());
        }

        return locacaoRepository.save(l);
    }

    @Transactional
    public Locacao updateStatus(Long id, StatusLocacao status) {
        Locacao l = getById(id);
        l.setStatus(status);
        return locacaoRepository.save(l);
    }

    @Transactional
    public void delete(Long id) {
        Locacao l = getById(id);
        locacaoRepository.delete(l);
    }

    /** Checa se existe conflito de agendamento para um carro no intervalo [inicio, fim] */
    @Transactional(readOnly = true)
    public boolean existeConflitoParaCarro(Long carroId, Instant inicio, Instant fim) {
        List<Locacao> emConflito = locacaoRepository.findByRetiradaBeforeAndDevolucaoAfter(fim, inicio);
        // Filtra só do carro informado (se quiser otimizar, crie query específica no repository)
        return emConflito.stream().anyMatch(l -> l.getCarro().getId().equals(carroId));
    }

    public LocacaoResponse toResponse(Locacao l) {
        LocacaoResponse r = new LocacaoResponse();
        r.id = l.getId();
        r.clienteId = l.getCliente().getId();
        r.clienteNome = l.getCliente().getNome(); // ajuste ao seu campo
        r.agenteId = l.getAgente().getId();
        r.agenteNome = l.getAgente().getNome();
        r.carroId = l.getCarro().getId();
        r.carroPlaca = l.getCarro().getPlaca();   // ajuste ao seu campo

        r.consideracaoAgente = l.getConsideracaoAgente();
        r.retirada = l.getRetirada();
        r.devolucao = l.getDevolucao();
        r.valorPrevisto = l.getValorPrevisto();
        r.valorFinal = l.getValorFinal();
        r.tipo = l.getTipo();
        r.status = l.getStatus();
        return r;
    }

    @Transactional(readOnly = true)
    public List<LocacaoResponse> listByAgenteDTO(Long agenteId) {
    return locacaoRepository.findByAgenteId(agenteId).stream()
        .map(l -> {
            LocacaoResponse r = new LocacaoResponse();
            r.setId(l.getId());
            r.setClienteId(l.getCliente().getId()); // inicializa dentro da transação
            r.setAgenteId(l.getAgente().getId());
            r.setCarroId(l.getCarro().getId());
            r.setConsideracaoAgente(l.getConsideracaoAgente());
            r.setRetirada(l.getRetirada());
            r.setDevolucao(l.getDevolucao());
            r.setValorPrevisto(l.getValorPrevisto());
            r.setValorFinal(l.getValorFinal());
            r.setTipo(l.getTipo());
            r.setStatus(l.getStatus());
            return r;
        })
        .toList();
    }

    @Transactional(readOnly = true)
    public List<LocacaoResponse> listByCarroDTO(Long carroId) {
        return locacaoRepository.findByCarroId(carroId).stream()
            .map(l -> {
                LocacaoResponse r = new LocacaoResponse();
                r.setId(l.getId());
                r.setClienteId(l.getCliente().getId()); // inicializa dentro da transação
                r.setAgenteId(l.getAgente().getId());
                r.setCarroId(l.getCarro().getId());
                r.setConsideracaoAgente(l.getConsideracaoAgente());
                r.setRetirada(l.getRetirada());
                r.setDevolucao(l.getDevolucao());
                r.setValorPrevisto(l.getValorPrevisto());
                r.setValorFinal(l.getValorFinal());
                r.setTipo(l.getTipo());
                r.setStatus(l.getStatus());
                return r;
            })
            .toList();
    }

    @Transactional(readOnly = true)
    public List<LocacaoResponse> listByStatusDTO(StatusLocacao status) {
        return locacaoRepository.findByStatus(status).stream()
            .map(l -> {
                LocacaoResponse r = new LocacaoResponse();
                r.setId(l.getId());
                r.setClienteId(l.getCliente().getId()); // inicializa dentro da transação
                r.setAgenteId(l.getAgente().getId());
                r.setCarroId(l.getCarro().getId());
                r.setConsideracaoAgente(l.getConsideracaoAgente());
                r.setRetirada(l.getRetirada());
                r.setDevolucao(l.getDevolucao());
                r.setValorPrevisto(l.getValorPrevisto());
                r.setValorFinal(l.getValorFinal());
                r.setTipo(l.getTipo());
                r.setStatus(l.getStatus());
                return r;
            })
            .toList();
    }
}
