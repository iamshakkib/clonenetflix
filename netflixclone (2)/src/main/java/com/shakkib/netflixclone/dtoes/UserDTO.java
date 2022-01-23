package com.shakkib.netflixclone.dtoes;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@ToString
public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String passWord;
    private LocalDateTime registeredDate;

    public UserDTO(String name, String email, LocalDateTime registeredDate) {
        this.name = name;
        this.email = email;
        this.registeredDate = LocalDateTime.now();
    }

    public UserDTO(String name, String email, String passWord, LocalDateTime registeredDate) {
        this.name = name;
        this.email = email;
        this.passWord = passWord;
        this.registeredDate = LocalDateTime.now();
    }
}
