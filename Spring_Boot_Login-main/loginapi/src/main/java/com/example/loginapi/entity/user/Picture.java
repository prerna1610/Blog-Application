package com.example.loginapi.entity.user;

import jakarta.persistence.*;

@Entity
@Table(name = "picture", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    @Lob
    private byte[] picture;

    public Picture(){
    }

    public Picture(String email, byte[] picture) {
        this.email = email;
        this.picture = picture;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }
}
