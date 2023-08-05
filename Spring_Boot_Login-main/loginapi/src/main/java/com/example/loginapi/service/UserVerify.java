package com.example.loginapi.service;

import com.example.loginapi.entity.user.User;
import com.example.loginapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserVerify {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;

    public boolean authenticate(String email, String password){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid Username or Password  !!"));
        return encoder.matches(password, user.getPassword());
    }

    public User loadUser(String email) {
        return userRepository.findByEmail(email).get();
    }

}