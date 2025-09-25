package com.example.locadora.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; // LINHA REMOVIDA
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.locadora.models.User;
import com.example.locadora.repositories.UserRepository;

@Service
public class UserService {
    
    // REMOVA ESTA ANOTAÇÃO. A injeção via construtor abaixo já é suficiente.
    private final UserRepository userRepository; 
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findById(Long id) {
        Optional<User> user = this.userRepository.findById(id); // Renomeei a variável para "user"
        return user.orElseThrow(() -> new RuntimeException(
                "Usuário não encontrado! Id: " + id + ", Type: " + User.class.getName()));
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

        // CORREÇÃO: Só atualize e criptografe a senha se uma nova senha for fornecida.
        if (obj.getPassword() != null && !obj.getPassword().isEmpty()) {
            newObj.setPassword(passwordEncoder.encode(obj.getPassword()));
        }
        
        return this.userRepository.save(newObj);
    }

    // A lógica de delete está ok, não precisa de alterações.
    @Transactional
    public void delete(Long id) {
        findById(id); // Boa prática para garantir que o usuário existe antes de tentar deletar
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(
                "Usuário não pode ser deletado, pois pode ter entidades relacionadas!"
            );
        }
    }
}