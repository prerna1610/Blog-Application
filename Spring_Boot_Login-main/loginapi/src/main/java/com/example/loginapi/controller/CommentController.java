package com.example.loginapi.controller;

import com.example.loginapi.entity.blog.Comment;
import com.example.loginapi.payload.request.CommentRequest;
import com.example.loginapi.payload.response.MessageResponse;
import com.example.loginapi.repository.CommentRepository;
import com.example.loginapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/post/{id}/comment")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentService commentService;

    @RequestMapping("")
    public ResponseEntity<?> newComment(@RequestBody CommentRequest request, @PathVariable long id, Principal principal){
        Comment comment = new Comment(id, principal.getName(), request.getContent());
        commentRepository.save(comment);
        return ResponseEntity.ok(new MessageResponse("Commented"));
    }

    @RequestMapping("/edit/{id1}")
    public ResponseEntity<?> editComment(@RequestBody CommentRequest request, @PathVariable long id, @PathVariable long id1, Principal principal){
        Comment comment = commentService.findById(id1);
        if (comment==null){
            throw new IllegalArgumentException("Post not found");
        }
        if (!comment.getEmail().equals(principal.getName()) || !(comment.getPost()==id)){
            throw new BadCredentialsException("No access");
        }
        comment.setContent(request.getContent());
        return ResponseEntity.ok(new MessageResponse("Comment edited"));
    }

    @RequestMapping("/delete/{id1}")
    public ResponseEntity<?> deleteComment(@PathVariable long id, @PathVariable long id1, Principal principal){
        Comment comment = commentService.findById(id1);
        if (comment==null){
            throw new IllegalArgumentException("Post not found");
        }
        if (!comment.getEmail().equals(principal.getName()) || !(comment.getPost()==id)){
            throw new BadCredentialsException("No access");
        }
        commentRepository.deleteById(id1);
        return ResponseEntity.ok(new MessageResponse("Comment deleted"));
    }
}
