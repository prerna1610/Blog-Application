package com.example.loginapi.entity.blog;

import com.example.loginapi.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String title;
    private String content;
    private LocalDateTime created = LocalDateTime.now();

    public Post(String email, String title, String content){
        this.email = email;
        this.title = title;
        this.content = content;
    }

}
