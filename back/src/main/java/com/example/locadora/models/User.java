package com.example.locadora.models;

import com.example.locadora.enums.NivelAcesso;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "profissao", nullable = true, length = 50, unique = false)
    private String profissao;

    @Column(name = "password", length = 60, nullable = false)
    @NotBlank
    @Size(min = 8, max = 60)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_acesso", nullable = false, length = 20)
    private  NivelAcesso nivelAcesso = NivelAcesso.CLIENTE;

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

    public String getProfissao() {
        return this.profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public NivelAcesso getNivelAcesso() {
        return this.nivelAcesso;
    }

    public void setNivelAcesso(NivelAcesso nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }   

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
