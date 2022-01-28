package com.shakkib.netflixclone.daos;

import com.shakkib.netflixclone.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserDao extends MongoRepository<User,String> {
    Optional<User> findUserById(String id);
    Optional<Boolean> existsByEmail(String email);
    Optional<Boolean> existsByPassWord(String password);
    Optional<User> findUserByEmail(String email);
    boolean existsById(String user_id);
    Optional<Boolean> existsByEmailAndPassWord(String email, String passWord);
    @Query("{'email':?0,'passWord':?1}")
    Optional<User> findUserByEmailAndPassWord(String email,String passWord);
}
