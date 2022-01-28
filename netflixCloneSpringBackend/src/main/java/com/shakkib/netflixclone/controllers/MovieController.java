package com.shakkib.netflixclone.controllers;

import com.shakkib.netflixclone.dtoes.MovieDTO;
import com.shakkib.netflixclone.entities.Movie;
import com.shakkib.netflixclone.exceptions.MovieDetailsNotFoundException;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;
import com.shakkib.netflixclone.services.impl.MovieServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("/user/v1/mylist")
public class MovieController {

    private MovieServiceImpl movieServiceImpl;

    @PostMapping("/add")
    public String addMovieInMyList(@RequestBody MovieDTO movieDTO){
        Movie movie = convertMovieDTOtoMovieEntity(movieDTO);
        Movie response = movieServiceImpl.addMovie(movie);
        String s = response.getId()!=null ? "success":"fail";
        System.out.println(s);
        return s;
    }

    @GetMapping("/allmovies/{user_id}")
    public ResponseEntity fetchAllMoviesOfUser(@PathVariable String user_id) throws UserDetailsNotFoundException, MovieDetailsNotFoundException {
        //Doubt api
        movieServiceImpl.checkUser(user_id);
        List<Movie> movies = movieServiceImpl.fetchMovie(user_id);
        List<MovieDTO> movieDTOS=new ArrayList<>();
        for(Movie movie:movies){
            movieDTOS.add(convertMovieEntitytoMovieDTO(movie));
        }
        return new ResponseEntity(movieDTOS, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{movie_id}")
    public String deleteMovieFromUserList(@PathVariable String movie_id){
        boolean flag = movieServiceImpl.deleteMovie(movie_id);
        if(flag)
            return "success";
        return "fail";
    }
    //i know i could use model mapper in the pom.xml to bring it but 
    // i thought let me just write it
    private MovieDTO convertMovieEntitytoMovieDTO(Movie movie){
        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setMovieId(movie.getMovieId());
        movieDTO.setId(movie.getId());
        movieDTO.setMovieSaveDate(movie.getMovieSaveDate());
        movieDTO.setUserId(movie.getUserId());
        movieDTO.setMovieTitle(movie.getMovieTitle());
        movieDTO.setUserEmail(movieDTO.getUserEmail());
        return movieDTO;
    }
    private Movie convertMovieDTOtoMovieEntity(MovieDTO movieDTO){
        Movie movie = new Movie();
        movie.setMovieId(movieDTO.getMovieId());
        movie.setId(movieDTO.getId());
        movie.setUserId(movieDTO.getUserId());
        movie.setUserEmail(movieDTO.getUserEmail());
        movie.setMovieTitle(movieDTO.getMovieTitle());
        movie.setMovieSaveDate(movieDTO.getMovieSaveDate());
        return movie;
    }
}
