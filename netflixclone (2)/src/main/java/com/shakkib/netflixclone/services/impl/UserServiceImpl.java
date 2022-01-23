package com.shakkib.netflixclone.services.impl;

import com.shakkib.netflixclone.daos.UserDao;
import com.shakkib.netflixclone.entities.User;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;
import com.shakkib.netflixclone.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    UserDao userDao;

    @Override
    public User createUser(User user) {
        User newUser = new User(user.getName(),user.getEmail(),user.getPassWord(),user.getRegisteredDate());
        User user1 = userDao.save(newUser);
        return user1;
    }

    @Override
    public User findUser(String id) throws UserDetailsNotFoundException {
        User newUser = userDao.findUserById(id).orElseThrow(()-> new UserDetailsNotFoundException("User does not exists"));
        return newUser;
    }

    public Boolean checkUserByEmail(String email) throws UserDetailsNotFoundException {
        return userDao.existsByEmail(email).orElseThrow(() -> new UserDetailsNotFoundException("User does not exists"));
    }
    public User findUserByEmail(String email) throws UserDetailsNotFoundException {
        return userDao.findUserByEmail(email).orElseThrow(()->new UserDetailsNotFoundException("User does not exists"));
    }
    public boolean checkUserByUserId(String user_id) throws UserDetailsNotFoundException{
        boolean flag = userDao.existsById(user_id);
        if(flag) {
            return flag;
        }
        else throw new UserDetailsNotFoundException("User does not exists with passed details");
    }
   // @Override
   // public List<String> moviesOfUser(String userId) {
     //   System.out.printf("Finding movies of userList %s%n",userId);
     //   List<String> list = userDao.findAllMoviesById(userId);
     //   System.out.printf("Returning the saved movies of users %s%n",list.size());
     //   return list;
    //}
}
