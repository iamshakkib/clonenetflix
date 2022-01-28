package com.shakkib.netflixclone.services.impl;

import javax.servlet.http.HttpSession;
import com.shakkib.netflixclone.daos.UserDao;
import com.shakkib.netflixclone.entities.User;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;
import com.shakkib.netflixclone.services.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

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

    public boolean checkUserExistsByEmailAndPassword(String email, String passWord) throws UserDetailsNotFoundException{
        return userDao.existsByEmailAndPassWord(email,passWord).orElseThrow(()-> new UserDetailsNotFoundException("Wrong email and password"));
    }

    public boolean checkUserByPassWord(String password) throws UserDetailsNotFoundException{
        boolean flag = userDao.existsByPassWord(password).orElseThrow(()-> new UserDetailsNotFoundException("user does not exists with password"));
        return flag;
    }

    public User findUserByEmailAndPassWord(String email,String passWord) throws UserDetailsNotFoundException{
        User user = userDao.findUserByEmailAndPassWord(email, passWord).orElseThrow(()
        -> {
                LOGGER.error("User details not found for the email: " + email);
                return new UserDetailsNotFoundException("User details not found for the email : " + email);
            });
        return user;
    }
    
    public String checkLogin(String email, String passWord, HttpSession httpSession) throws UserDetailsNotFoundException{
        User user = findUserByEmail(email);
        LOGGER.info("the user in service layer details :"+user);
        LOGGER.info(email+" + "+passWord+" + "+user.getPassWord());
        boolean flag=true;
        //System.out.println("type"+user.getPassWord().getClass().getName());
        if(user.getPassWord().compareTo(passWord)==0){
            flag =true;
            //System.out.println("if executed");
        }else{
            //System.out.println("else executed");
            flag=false;
        }
        if(flag){
            LOGGER.info("inside the true statement : ");
            httpSession.setAttribute("USERID_SESSION", user.getEmail());
            return user.getId();
        }
        else throw new UserDetailsNotFoundException("UserName and Password are wrong");
    }

    public boolean joiningMethod(User user) throws UserDetailsNotFoundException{
        LOGGER.info("User details in joning method :"+user);
        boolean flag = checkUserByEmail(user.getEmail());
        if(flag)
        return true;
        else return false;    
    }
   // @Override
   // public List<String> moviesOfUser(String userId) {
     //   System.out.printf("Finding movies of userList %s%n",userId);
     //   List<String> list = userDao.findAllMoviesById(userId);
     //   System.out.printf("Returning the saved movies of users %s%n",list.size());
     //   return list;
    //}
}
