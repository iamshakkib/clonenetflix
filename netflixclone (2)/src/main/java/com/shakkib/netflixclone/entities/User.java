package com.shakkib.netflixclone.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document("users")
public class User{
    @Id
    private String id;
    private String name;
    private String email;
    private String passWord;
    private LocalDateTime registeredDate;

    public User(String name, String email, LocalDateTime registeredDate) {
        this.name = name;
        this.email = email;
        this.registeredDate = LocalDateTime.now();
    }

    public User(String name, String email, String passWord, LocalDateTime registeredDate) {
        this.name = name;
        this.email = email;
        this.passWord = passWord;
        this.registeredDate = LocalDateTime.now();
    }
}
