package com.example.locadora.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "works")
public class Work {
    @Id
    @GeneratedValue
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "position", unique = false, length = 100)
    @NotBlank
    private String position;

    @Column(name = "firm", unique = false, length = 100)
    @NotBlank
    private String firm;

    @Column(name = "start", unique = false)
    @NotBlank
    private LocalDate start;
    
    @Column(name = "end", unique = false, nullable = true)
    private LocalDate end;

    @Column(name = "wage", unique = false)
    @NotBlank
    private Float wage;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return this.position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getFirm() {
        return this.firm;
    }

    public void setFirm(String firm) {
        this.firm = firm;
    }

    public LocalDate getStart() {
        return this.start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return this.end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Float getWage() {
        return this.wage;
    }

    public void setWage(Float wage) {
        this.wage = wage;
    }
}
