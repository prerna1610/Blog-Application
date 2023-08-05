package com.example.loginapi.controller;

import com.example.loginapi.entity.blog.Post;
import com.example.loginapi.entity.user.User;
import com.example.loginapi.payload.response.ProfileResponse;
import com.example.loginapi.service.PostService;
import com.example.loginapi.service.UserVerify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomeController {

    @Autowired
    PostService postService;

    @Autowired
    UserVerify userVerify;

    @Autowired
    ProfileResponse profile;
    @RequestMapping("/")
    public String welcome(Principal principal) {
        User user = userVerify.loadUser(principal.getName());
        return "Welcome " + user.getName() + ".";
    }

    @RequestMapping("/home")
    public ArrayList<Post> showAllPosts(){
        ArrayList<Post> posts = postService.findAllPosts();
        Collections.reverse(posts);
        return posts;
    }

    @RequestMapping("/profile")
    public ProfileResponse profile(Principal principal){
        User user = userVerify.loadUser(principal.getName());
        ProfileResponse response = ProfileResponse.builder()
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .state(user.getState())
                .zip(user.getZip()).build();
        return response;
    }
}
