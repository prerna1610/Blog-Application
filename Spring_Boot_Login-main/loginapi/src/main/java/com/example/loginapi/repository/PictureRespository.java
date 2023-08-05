package com.example.loginapi.repository;

import com.example.loginapi.entity.user.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictureRespository extends JpaRepository<Picture, Long> {
    Optional<Picture> findByEmail(String email);
}
