package com.shakkib.netflixclone.daos;

import com.shakkib.netflixclone.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserDao extends MongoRepository<User,String> {
    Optional<User> findUserById(String id);
    Optional<Boolean> existsByEmail(String email);
    Optional<User> findUserByEmail(String email);
    boolean existsById(String user_id);
}
