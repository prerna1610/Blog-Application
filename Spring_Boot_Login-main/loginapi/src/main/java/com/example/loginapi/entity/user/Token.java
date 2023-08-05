package com.example.loginapi.entity.user;

import jakarta.persistence.*;

@Entity
@Table(name = "tokens", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Token {
    @Id
    private String email;
    private String token;

    public Token(){
    }
    public Token(String email) {
        this.email = email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
}
