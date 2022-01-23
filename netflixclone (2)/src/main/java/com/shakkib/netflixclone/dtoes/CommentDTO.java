package com.shakkib.netflixclone.dtoes;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class CommentDTO {
    private String id;
    private String userId;
    private String movieId;
    private String userEmail;
    private LocalDateTime commentAt;
    private String content;

    public CommentDTO(String userId, String movieId, String userEmail, LocalDateTime commentAt, String content) {
        this.userId = userId;
        this.movieId = movieId;
        this.userEmail = userEmail;
        this.commentAt = LocalDateTime.now();
        this.content = content;
    }
}
