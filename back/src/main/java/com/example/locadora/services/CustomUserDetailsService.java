package com.example.locadora.services;

import com.example.locadora.repositories.UserRepository; // <-- Importe seu repositório de usuário
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Lógica para buscar o usuário no banco de dados pelo e-mail
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        // Retorna um objeto UserDetails que o Spring Security entende
        return new User(user.getEmail(), user.getPassword(), new ArrayList<>()); // Por enquanto, sem roles/autoridades
    }
}