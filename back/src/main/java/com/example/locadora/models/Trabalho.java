package com.example.locadora.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "trabalhos")
public class Trabalho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cargo", unique = false, length = 100)
    @NotBlank
    private String cargo;

    @Column(name = "empresa", unique = false, length = 100)
    @NotBlank
    private String empresa;

    @Column(name = "comeco", unique = false)
    @NotNull
    private LocalDate comeco;
    
    @Column(name = "termino", unique = false, nullable = true)
    private LocalDate termino;

    @Column(name = "salario", unique = false)
    @NotNull
    private Float salario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_trabalho_user"))
    private User user;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCargo() {
        return this.cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getEmpresa() {
        return this.empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public LocalDate getComeco() {
        return this.comeco;
    }

    public void setComeco(LocalDate comeco) {
        this.comeco = comeco;
    }

    public LocalDate getTermino() {
        return this.termino;
    }

    public void setTermino(LocalDate termino) {
        this.termino = termino;
    }

    public Float getSalario() {
        return this.salario;
    }

    public void setSalario(Float salario) {
        this.salario = salario;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }    
}
