package com.example.locadora.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100)
    @NotBlank
    private String nome;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    @NotBlank
    private String email;

    @Column(name = "rg", nullable = true, length = 9, unique = true)
    private String rg;

    @Column(name = "cpf", nullable = true, length = 11, unique = true)
    private String cpf;

    @Column(name = "profisao", nullable = true, length = 50, unique = false)
    private String profisao;

    @Column(name = "access_level", unique = false)
    private  Integer nivelAcesso;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRg() {
        return this.rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getProfisao() {
        return this.profisao;
    }

    public void setProfisao(String profisao) {
        this.profisao = profisao;
    }

    public Integer getNivelAcesso() {
        return this.nivelAcesso;
    }

    public void setNivelAcesso(Integer nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }   
}
