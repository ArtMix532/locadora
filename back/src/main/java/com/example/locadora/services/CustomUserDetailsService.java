package com.example.locadora.services;

import com.example.locadora.models.User; // IMPORT ADICIONAL
import com.example.locadora.repositories.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // IMPORT ADICIONAL
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections; // IMPORT ADICIONAL

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + email));
        
        // CORREÇÃO: Passar a role/permissão do usuário. 
        // O "ROLE_" é um prefixo padrão que o Spring Security espera.
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(), 
            user.getPassword(), 
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getNivelAcesso().toString()))
        );
    }
}