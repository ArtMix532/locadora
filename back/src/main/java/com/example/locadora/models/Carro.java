package com.example.locadora.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "carros")
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "matricula", unique = true)
    private  String matricula;

    @NotBlank
    @Size(max = 120)
    @Column(name = "modelo", nullable = false, length = 120)
    private String modelo;

    @NotBlank
    @Size(max = 60)
    @Column(name = "marca", nullable = false, length = 60)
    private String marca;

    // Aceita padrão antigo (AAA1234) e Mercosul (ABC1D23). Salva sem hífen e em maiúsculo.
    @NotBlank
    @Pattern(
        regexp = "^([A-Z]{3}\\d{4}|[A-Z]{3}\\d[A-Z]\\d{2})$",
        message = "placa inválida (use AAA1234 ou ABC1D23)"
    )
    @Column(nullable = false, length = 10, unique = true)
    private String placa;

    @NotNull
    @Min(1900) @Max(2100)
    @Column(nullable = false)
    private Integer ano;

    @Column(nullable = false)
    private boolean disponivel = true;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return this.modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return this.marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getPlaca() {
        return this.placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Integer getAno() {
        return this.ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public boolean isDisponivel() {
        return this.disponivel;
    }

    public boolean getDisponivel() {
        return this.disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

}
