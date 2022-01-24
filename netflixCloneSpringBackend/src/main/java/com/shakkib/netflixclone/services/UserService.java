package com.shakkib.netflixclone.services;

import com.shakkib.netflixclone.entities.User;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;

public interface UserService {
    User createUser(User user);
    User findUser(String id) throws UserDetailsNotFoundException;
   // List<String> moviesOfUser(String userId);
}
