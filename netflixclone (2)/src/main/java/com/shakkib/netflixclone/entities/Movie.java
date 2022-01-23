package com.shakkib.netflixclone.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Movie {
    @Id
    private String id;
    private String userId;
    private String movieId;
    private String movieTitle;
    private String userEmail;
    private LocalDateTime movieSaveDate;
}
