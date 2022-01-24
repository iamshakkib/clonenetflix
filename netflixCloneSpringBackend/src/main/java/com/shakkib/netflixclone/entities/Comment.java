package com.shakkib.netflixclone.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    private String id;
    private String userId;
    private String movieId;
    private String userEmail;
    private LocalDateTime commentAt;
    private String content;

    public Comment(String userId, String movieId, String userEmail, LocalDateTime commentAt, String content) {
        this.userId = userId;
        this.movieId = movieId;
        this.userEmail = userEmail;
        this.commentAt = LocalDateTime.now();
        this.content = content;
    }
}
