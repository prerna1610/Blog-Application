package com.example.loginapi.repository;

import com.example.loginapi.entity.blog.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    ArrayList<Comment> findAllByPost(long id);
}
