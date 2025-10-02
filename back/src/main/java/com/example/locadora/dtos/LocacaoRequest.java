package com.example.locadora.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.locadora.enums.StatusLocacao;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LocacaoRequest {

    @NotNull
    private Long clienteId;

    @NotNull
    private Long agenteId;

    @NotNull
    private Long carroId;

    private String consideracaoAgente;

    private LocalDateTime retirada;  // opcional no create, dependendo da regra
    private LocalDateTime devolucao; // opcional

    @Digits(integer = 12, fraction = 2)
    private BigDecimal valorPrevisto;

    @Digits(integer = 12, fraction = 2)
    private BigDecimal valorFinal;

    @NotBlank
    private String tipo;

    // opcional no create; por padrão model usa RESERVADA
    private StatusLocacao status;

    // getters/setters
    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public Long getAgenteId() { return agenteId; }
    public void setAgenteId(Long agenteId) { this.agenteId = agenteId; }

    public Long getCarroId() { return carroId; }
    public void setCarroId(Long carroId) { this.carroId = carroId; }

    public String getConsideracaoAgente() { return consideracaoAgente; }
    public void setConsideracaoAgente(String consideracaoAgente) { this.consideracaoAgente = consideracaoAgente; }

    public LocalDateTime getRetirada() { return retirada; }
    public void setRetirada(LocalDateTime retirada) { this.retirada = retirada; }

    public LocalDateTime getDevolucao() { return devolucao; }
    public void setDevolucao(LocalDateTime devolucao) { this.devolucao = devolucao; }

    public BigDecimal getValorPrevisto() { return valorPrevisto; }
    public void setValorPrevisto(BigDecimal valorPrevisto) { this.valorPrevisto = valorPrevisto; }

    public BigDecimal getValorFinal() { return valorFinal; }
    public void setValorFinal(BigDecimal valorFinal) { this.valorFinal = valorFinal; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public StatusLocacao getStatus() { return status; }
    public void setStatus(StatusLocacao status) { this.status = status; }
}
