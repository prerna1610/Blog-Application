package com.example.loginapi.service;

import com.example.loginapi.entity.blog.Post;
import com.example.loginapi.payload.request.PostRequest;
import com.example.loginapi.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    public ArrayList<Post> findAllPosts(){
        return (ArrayList<Post>) postRepository.findAll();
    }

    public ArrayList<Post> findAllByEmail(String email){
        return (ArrayList<Post>) postRepository.findAllByEmail(email);
    }

    public Post findById(long id){
        Optional<Post> opt = postRepository.findById(id);
        if (opt.isPresent()){
            return opt.get();
        }
        else{
            return null;
        }
    }

}
