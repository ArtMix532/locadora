// src/main/java/com/example/locadora/controllers/PingController.java
package com.example.locadora.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {
  @GetMapping("/healthz") public String healthz(){ return "ok"; }
}
