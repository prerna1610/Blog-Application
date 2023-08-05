package com.example.loginapi.controller;

import com.example.loginapi.entity.blog.Comment;
import com.example.loginapi.entity.blog.Post;
import com.example.loginapi.payload.request.PostRequest;
import com.example.loginapi.payload.response.MessageResponse;
import com.example.loginapi.payload.response.PostResponse;
import com.example.loginapi.repository.PostRepository;
import com.example.loginapi.service.CommentService;
import com.example.loginapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @Autowired
    PostRepository postRepository;

    @RequestMapping("")
    public ResponseEntity<?> newPost(@RequestBody PostRequest request, Authentication authentication) {
        // Get the authenticated user's email
        String email = authentication.getName();

        Post newPost = new Post(email, request.getTitle(), request.getContent());
        postRepository.save(newPost);
        return ResponseEntity.ok(new MessageResponse("New post posted."));
    }

    @RequestMapping("/me")
    public ArrayList<Post> showAllById(Principal principal){
        ArrayList<Post> posts = postService.findAllByEmail(principal.getName());
        return posts;
    }
    @RequestMapping("/{id}")
    public ResponseEntity<PostResponse> showById(@PathVariable long id){
        Post post = postService.findById(id);  //comment add karna
        ArrayList<Comment> comments = commentService.findAllByPost(id);

        PostResponse response = PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .created(post.getCreated())
                .comments(comments).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping("/edit/{id}")
    public ResponseEntity<?> editPost(@RequestBody PostRequest request, @PathVariable long id, Principal principal){
        Post post = postService.findById(id);
        if (post==null){
            throw new IllegalArgumentException("Post not found");
        }
        if (!post.getEmail().equals(principal.getName())){
            throw new BadCredentialsException("No access");
        }
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        postRepository.save(post);
        return ResponseEntity.ok(new MessageResponse("Post edited"));
    }

    @RequestMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable long id, Principal principal){
        Post post = postService.findById(id);
        if (post==null){
            throw new IllegalArgumentException("Post not found");
        }
        if (!post.getEmail().equals(principal.getName())){
            throw new BadCredentialsException("No access");
        }
        postRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Post deleted"));
    }
}
