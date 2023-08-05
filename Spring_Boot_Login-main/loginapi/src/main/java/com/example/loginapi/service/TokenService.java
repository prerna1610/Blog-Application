package com.example.loginapi.service;

import com.example.loginapi.entity.user.Token;
import com.example.loginapi.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {
    @Autowired
    TokenRepository tokenRepository;

    public Token findToken(String email){
        Optional<Token> opt = tokenRepository.findByEmail(email);
        if (opt.isPresent()) {
            return opt.get();
        }
        else {
            Token token = new Token(email);
            return token;
        }
    }
}
