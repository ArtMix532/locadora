package com.example.locadora.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "road", nullable = false, length = 100)
    @NotBlank
    private String road;

    @Column(name = "number", nullable = false, length = 10)
    @NotBlank
    private String number;

    @Column(name = "city", nullable = false, length = 100)
    @NotBlank
    private String city;

    @Column(name = "state", nullable = false, length = 100)
    @NotBlank
    private String state;

    @Column(name = "cep", nullable = false, length = 10)
    @NotBlank
    private String cep;

    @Column(name = "complement", nullable = true, length = 100)
    private String complement;

}
