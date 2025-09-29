package com.example.locadora.dtos;

// LocacaoResponse.java

import java.math.BigDecimal;
import java.time.Instant;

import com.example.locadora.enums.StatusLocacao;
import com.example.locadora.models.Locacao;

public class LocacaoResponse {
  public Long id;
  public Long clienteId;
  public Long agenteId;
  public Long carroId;
  public String consideracaoAgente;
  public Instant retirada;
  public Instant devolucao;
  public BigDecimal valorPrevisto;
  public BigDecimal valorFinal;
  public String tipo;
  public StatusLocacao status;
  public String clienteNome; 
  public String agenteNome; 
  public String carroPlaca;

  public static LocacaoResponse of(Locacao l) {
    LocacaoResponse r = new LocacaoResponse();
    r.id = l.getId();
    r.clienteId = l.getCliente().getId();
    r.agenteId = l.getAgente().getId();
    r.carroId = l.getCarro().getId();
    r.consideracaoAgente = l.getConsideracaoAgente();
    r.retirada = l.getRetirada();
    r.devolucao = l.getDevolucao();
    r.valorPrevisto = l.getValorPrevisto();
    r.valorFinal = l.getValorFinal();
    r.tipo = l.getTipo();
    r.status = l.getStatus();
    r.clienteNome = l.getCliente().getNome();
    r.agenteNome = l.getAgente().getNome();
    r.carroPlaca = l.getCarro().getPlaca();
    return r;
  }


  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getClienteId() {
    return this.clienteId;
  }

  public void setClienteId(Long clienteId) {
    this.clienteId = clienteId;
  }

  public Long getAgenteId() {
    return this.agenteId;
  }

  public void setAgenteId(Long agenteId) {
    this.agenteId = agenteId;
  }

  public Long getCarroId() {
    return this.carroId;
  }

  public void setCarroId(Long carroId) {
    this.carroId = carroId;
  }

  public String getConsideracaoAgente() {
    return this.consideracaoAgente;
  }

  public void setConsideracaoAgente(String consideracaoAgente) {
    this.consideracaoAgente = consideracaoAgente;
  }

  public Instant getRetirada() {
    return this.retirada;
  }

  public void setRetirada(Instant retirada) {
    this.retirada = retirada;
  }

  public Instant getDevolucao() {
    return this.devolucao;
  }

  public void setDevolucao(Instant devolucao) {
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

  public String getTipo() {
    return this.tipo;
  }

  public void setTipo(String tipo) {
    this.tipo = tipo;
  }

  public StatusLocacao getStatus() {
    return this.status;
  }

  public void setStatus(StatusLocacao status) {
    this.status = status;
  }

  public String getClienteNome() {
    return this.clienteNome;
  }

  public void setClienteNome(String clienteNome) {
    this.clienteNome = clienteNome;
  }

  public String getAgenteNome() {
    return this.agenteNome;
  }

  public void setAgenteNome(String agenteNome) {
    this.agenteNome = agenteNome;
  }

  public String getCarroPlaca() {
    return this.carroPlaca;
  }

  public void setCarroPlaca(String carroPlaca) {
    this.carroPlaca = carroPlaca;
  }

}
