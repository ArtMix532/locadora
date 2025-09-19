package com.example.locadora.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.locadora.models.User;
import com.example.locadora.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findById(Long id) {
        Optional<User> funcionario = this.userRepository.findById(id);
        return funcionario.orElseThrow(() -> new RuntimeException(
                "Usúario não encontrado! Id: " + id + ", Type: " + User.class.getName()));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User create(User obj) {
        obj.setId(null);
        obj.setPassword(passwordEncoder.encode(obj.getPassword()));
        obj = this.userRepository.save(obj);
        return obj;
    }

    @Transactional
    public User update(User obj) {
        User newObj = findById(obj.getId());
        newObj.setNome(obj.getNome());
        newObj.setEmail(obj.getEmail());
        newObj.setRg(obj.getRg());
        newObj.setCpf(obj.getCpf());
        newObj.setProfissao(obj.getProfissao()); 
        newObj.setNivelAcesso(obj.getNivelAcesso());
        newObj.setPassword(passwordEncoder.encode(obj.getPassword()));
        return this.userRepository.save(newObj);
    }

    @Transactional
    public void delete(Long id) {
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(
                "Usúario não pode ser deletado, pois tem entidades dependentes relacionadas!"
            );
        }
    }
}
