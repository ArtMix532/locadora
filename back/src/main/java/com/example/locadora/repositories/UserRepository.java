package com.example.locadora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.locadora.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}
