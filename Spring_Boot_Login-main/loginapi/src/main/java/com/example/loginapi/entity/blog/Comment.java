package com.example.loginapi.entity.blog;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long post;
    private String email;
    private String content;
    private LocalDateTime created = LocalDateTime.now();

    public Comment(long post, String email, String content){
        this.post = post;
        this.email = email;
        this.content = content;
    }

}
