package com.example.locadora.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.locadora.enums.StatusLocacao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Model de locação.
 * Observação: troque "User" abaixo pela sua classe real de usuário (ex.: User/Account).
 */
@Entity
@Table(
    name = "locacoes",
    indexes = {
        @Index(name = "idx_loc_cliente", columnList = "cliente_id"),
        @Index(name = "idx_loc_agente",  columnList = "agente_id"),
        @Index(name = "idx_loc_carro",   columnList = "carro_id"),
        @Index(name = "idx_loc_status",  columnList = "status")
    }
)
public class Locacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Cliente que está alugando */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_locacao_cliente"))
    private User cliente;   // <-- troque para sua entidade de usuário

    /** Agente/atendente responsável */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "agente_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_locacao_agente"))
    private User agente;    // <-- troque para sua entidade de usuário

    /** Carro alugado */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "carro_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_locacao_carro"))
    private Carro carro;

    /** Consideração/parecer do agente sobre a locação */
    @Size(max = 1000)
    @Column(name = "consideracao_agente", length = 1000)
    private String consideracaoAgente;

    /** Datas em UTC (recomendado usar DATETIME(3) no MySQL) */
    @Column(name = "retirada")
    private LocalDateTime retirada;

    @Column(name = "devolucao")
    private LocalDateTime devolucao;

    /** Valores (use DECIMAL em banco) */
    @Digits(integer = 12, fraction = 2)
    @Column(name = "valor_previsto", precision = 12, scale = 2)
    private BigDecimal valorPrevisto;

    @Digits(integer = 12, fraction = 2)
    @Column(name = "valor_final", precision = 12, scale = 2)
    private BigDecimal valorFinal;

    @Column(name = "tipo")
    @NotBlank
    private String tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusLocacao status = StatusLocacao.RESERVADA;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCliente() {
        return this.cliente;
    }

    public void setCliente(User cliente) {
        this.cliente = cliente;
    }

    public User getAgente() {
        return this.agente;
    }

    public void setAgente(User agente) {
        this.agente = agente;
    }

    public String getConsideracaoAgente() {
        return this.consideracaoAgente;
    }

    public void setConsideracaoAgente(String consideracaoAgente) {
        this.consideracaoAgente = consideracaoAgente;
    }

    public LocalDateTime getRetiradaEm() {
        return this.retirada;
    }

    public void setRetiradaEm(LocalDateTime retirada) {
        this.retirada = retirada;
    }

    public LocalDateTime getDevolucaoEm() {
        return this.devolucao;
    }

    public void setDevolucaoEm(LocalDateTime devolucao) {
        this.devolucao = devolucao;
    }

    public BigDecimal getValorPrevisto() {
        return this.valorPrevisto;
    }

    public void setValorPrevisto(BigDecimal valorPrevisto) {
        this.valorPrevisto = valorPrevisto;
    }

    public BigDecimal getValorFinal() {
        return this.valorFinal;
    }

    public void setValorFinal(BigDecimal valorFinal) {
        this.valorFinal = valorFinal;
    }

    public StatusLocacao getStatus() {
        return this.status;
    }

    public void setStatus(StatusLocacao status) {
        this.status = status;
    }   
    
    public Carro getCarro() {
        return this.carro;
    }

    public void setCarro(Carro carro) {
        this.carro = carro;
    }

    public LocalDateTime getRetirada() {
        return this.retirada;
    }

    public void setRetirada(LocalDateTime retirada) {
        this.retirada = retirada;
    }

    public LocalDateTime getDevolucao() {
        return this.devolucao;
    }

    public void setDevolucao(LocalDateTime devolucao) {
        this.devolucao = devolucao;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
}
