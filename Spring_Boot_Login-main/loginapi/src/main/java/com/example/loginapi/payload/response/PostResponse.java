package com.example.loginapi.payload.response;

import com.example.loginapi.entity.blog.Comment;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {
    private long id;
    private String title;
    private String content;
    private LocalDateTime created;
    ArrayList<Comment> comments;
}
