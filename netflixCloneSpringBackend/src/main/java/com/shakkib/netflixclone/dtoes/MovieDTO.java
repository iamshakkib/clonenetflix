package com.shakkib.netflixclone.dtoes;

import lombok.*;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MovieDTO {
    private String id;
    private String userId;
    private String movieId;
    private String movieTitle;
    private String userEmail;
    private LocalDateTime movieSaveDate;

    public MovieDTO(String userId, String movieId, String movieTitle, String userEmail, LocalDateTime movieSaveDate) {
        this.userId = userId;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.userEmail = userEmail;
        this.movieSaveDate = LocalDateTime.now();
    }
}
