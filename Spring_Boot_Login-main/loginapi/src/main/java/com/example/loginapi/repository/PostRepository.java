package com.example.loginapi.repository;

import com.example.loginapi.entity.blog.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findById(long id);

    ArrayList<Post> findAllByEmail(String email);
}
