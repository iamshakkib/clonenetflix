package com.shakkib.netflixclone.controllers;

import com.shakkib.netflixclone.dtoes.UserDTO;
import com.shakkib.netflixclone.entities.User;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;
import com.shakkib.netflixclone.services.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/user/v1")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    //https://api.themoviedb.org/3/movie/550?api_key=b4eda142837c245432c018af5c4ec342

    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO){
        User user = convertUserDTOToUserEntity(userDTO);
        System.out.println(userDTO);
        User response = userServiceImpl.createUser(user);
        System.out.println(response);
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
        User user1 = convertUserDTOToUserEntity(userDTO);
        User myuser = null;
            User user = userServiceImpl.findUserByEmail(user1.getEmail());
            System.out.println(user);
            if (user != null) {
                myuser = new User(user.getId(), user.getName(), user.getEmail(), user.getPassWord(), user.getRegisteredDate());
                System.out.println(myuser);
                httpSession.setAttribute("USERID_SESSION", userDTO.getEmail());
            }
        UserDTO myuser1 = convertUserEntityToUserDTO(myuser);
        return ResponseEntity.ok(myuser1.getId());
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
        Boolean user = userServiceImpl.checkUserByEmail(user1.getEmail());
            System.out.println(user + " " + user1.getEmail());

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

    private UserDTO convertUserEntityToUserDTO(User user){
        UserDTO userDTO = new UserDTO(user.getName(),user.getEmail(),user.getRegisteredDate());
        return userDTO;
    }

    private User convertUserDTOToUserEntity(UserDTO userDTO){
        User user = new User(userDTO.getName(), userDTO.getEmail(), userDTO.getRegisteredDate());
        return user;
    }
}
