package com.shakkib.netflixclone.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.shakkib.netflixclone.services.impl.MovieUserServiceImpl;
import lombok.AllArgsConstructor;
import java.lang.String;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("api/v1/movie")
public class MovieUserController {

    MovieUserServiceImpl movieUserServiceImpl;

    @GetMapping(value ="/search")
    public ResponseEntity<String> searchMoviesByQueryString(@RequestParam(value = "pageNo",defaultValue = "1")String page,
                                             @RequestParam(value = "query",required = true) String query) {
        String result=movieUserServiceImpl.searchMoviesByQueryString(page, query);
        return result != null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value ="/credits")
    public ResponseEntity<String> getMovieCredits(
            @RequestParam(value = "id",required = true) String id) {
        String result=movieUserServiceImpl.getMovieCredits(id);
        return result!=null?ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/popular")
    public ResponseEntity<String> getPopularMovies(@RequestParam(value = "page",defaultValue = "1") String page){
        String result = movieUserServiceImpl.popularMovies(page);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/detail")
    public ResponseEntity<String> getMovieDetails(@RequestParam(value="id")String id){
        String result = movieUserServiceImpl.getMovieDetails(id);
        return result != null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/toprated")
    public ResponseEntity<String> getTopratedMovies(@RequestParam(value="page",defaultValue = "1")String page){
        String result = movieUserServiceImpl.getTopratedMovies(page);
        return result != null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/discover")
    public ResponseEntity<String> getAllMovies(@RequestParam(value="page",defaultValue = "1")String page){
        String result = movieUserServiceImpl.getAllMovies(page);
        return result != null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/similar")
    public ResponseEntity<String> searchSimilarMoviesById(@RequestParam(value = "page",defaultValue = "1")String page,@RequestParam(value = "id",required = true)String id){
        String result = movieUserServiceImpl.searchSimilarMoviesByid(page,id);
        return result != null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/image")
    public Object getMovieImage(@RequestParam(value="id")String id) throws JsonProcessingException {
        Object response = movieUserServiceImpl.getMovieImage(id);
        return response != null ? ResponseEntity.ok(response):ResponseEntity.badRequest().body(null);
    }

    @GetMapping(value = "/realimage")
    public ResponseEntity<Object> getRealMovieImage(@RequestParam(value = "id") String id) {
        Object result = movieUserServiceImpl.getRealMovieImage(id);
        return result!=null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/video")
    public ResponseEntity<Object> getMovieVideo(@RequestParam(value = "id") String id) {
        Object result = movieUserServiceImpl.getMovieVideo(id);
        return result!=null?ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/genre")
    public ResponseEntity<String> getMovieListByGenre(
            @RequestParam(value = "page",defaultValue = "1") String page,
            @RequestParam(value = "genre") String genre){
        System.out.println(genre);
        String result = movieUserServiceImpl.getMovieListByGenre(genre,page);
        return result!=null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/sortBy")
    public ResponseEntity<String> getSortByMovies(@RequestParam(value = "page",defaultValue = "1") String page,
                                  @RequestParam(value ="sort",defaultValue = "popularity.desc") String sort ) {
        String result = movieUserServiceImpl.getSortByMovies(page,sort);
        return result!= null ? ResponseEntity.ok(result):ResponseEntity.badRequest().body(null);
    }
}