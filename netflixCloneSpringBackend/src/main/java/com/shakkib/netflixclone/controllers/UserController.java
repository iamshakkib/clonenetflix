package com.shakkib.netflixclone.controllers;

import com.shakkib.netflixclone.dtoes.UserDTO;
import com.shakkib.netflixclone.entities.User;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;
import com.shakkib.netflixclone.services.impl.UserServiceImpl;
import lombok.AllArgsConstructor;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ch.qos.logback.classic.Logger;

import javax.servlet.http.HttpSession;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/user/v1")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    private static final Logger LOGGER = (Logger) LoggerFactory.getLogger(UserController.class);

    //https://api.themoviedb.org/3/movie/550?api_key=b4eda142837c245432c018af5c4ec342

    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        User user = convertUserDTOToUserEntity(userDTO);
        LOGGER.info("Pass UserDTO detials"+ userDTO);
        User response = userServiceImpl.createUser(user);
        LOGGER.info("Printing the response for details"+ response);
        UserDTO response1 = convertUserEntityToUserDTO(response);
        return ResponseEntity.ok(response1);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") String id) throws UserDetailsNotFoundException {
        User response = userServiceImpl.findUser(id);
        UserDTO userDTO = convertUserEntityToUserDTO(response);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpSession httpSession) throws UserDetailsNotFoundException{
        //User user1 = convertUserDTOToUserEntity(userDTO);
        //User myuser = null;
            String response = userServiceImpl.checkLogin(userDTO.getEmail(), userDTO.getPassWord(), httpSession);
            return response != null ? ResponseEntity.ok(response): ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/logout")
    String logout(HttpSession httpSession) {
        System.out.println("log out");
        httpSession.invalidate();
        return "log out";
    }

    @PostMapping("/join")
    //till now im getting null pointer because trying to access id from dto passed which is null
    //then technique should check whether user exists or not by using its email,
    ResponseEntity<String> join(@RequestBody UserDTO userDTO, HttpSession httpSession) throws UserDetailsNotFoundException{
        System.out.println(userDTO.toString());
        User user1 = convertUserDTOToUserEntity(userDTO);
        Boolean user = userServiceImpl.joiningMethod(user1);
        LOGGER.info(user + " " + user1.getEmail());

            //instead of user1.getId() define method whether user exits or not by email idif exits return string else create user then return its id;
            if (user) {
                return new ResponseEntity("user already exists",HttpStatus.ALREADY_REPORTED);
            } else {
                User newUser = userServiceImpl.createUser(user1);
                // User newUser = userServiceImpl.findUser(user1.getId());
                System.out.println(newUser);
                httpSession.setAttribute("USERID_SESSION", newUser.getEmail());
                return ResponseEntity.ok(newUser.getId());
            }

    }
//i havent used model mapper instead i have written my own code
    private UserDTO convertUserEntityToUserDTO(User user){
        UserDTO userDTO = new UserDTO(user.getId(),user.getName(),user.getEmail(),user.getRegisteredDate());
        return userDTO;
    }

    private User convertUserDTOToUserEntity(UserDTO userDTO){
        User user = new User(userDTO.getId(),userDTO.getName(), userDTO.getEmail(), userDTO.getRegisteredDate());
        return user;
    }
}
