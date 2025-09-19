package com.example.locadora.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.JsonNode;

@RestController
@RequestMapping("cep")
public class CepController {
    
    private final RestClient http = RestClient.create();

    @GetMapping("/{cep}")
    public JsonNode buscarCep(@PathVariable String cep){
        return http.get()
        .uri("https://viacep.com.br/ws/{cep}/json", cep.replaceAll("\\D",""))
        .retrieve()
        .body(JsonNode.class);
    }
}
