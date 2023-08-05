package com.example.loginapi.service;

import com.example.loginapi.entity.blog.Comment;
import com.example.loginapi.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.lang.model.type.ArrayType;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public ArrayList<Comment> findAllByPost(long id){
        return (ArrayList<Comment>) commentRepository.findAllByPost(id);
    }

    public Comment findById(long id){
        Optional<Comment> opt = commentRepository.findById(id);
        if (opt.isPresent()){
            return opt.get();
        }
        else{
            return null;
        }
    }
}
