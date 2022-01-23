package com.shakkib.netflixclone.services;

import com.shakkib.netflixclone.entities.Movie;
import com.shakkib.netflixclone.exceptions.MovieDetailsNotFoundException;

import java.util.List;

public interface MovieService {
    List<Movie> fetchMovie(String user_id) throws MovieDetailsNotFoundException;
    Movie addMovie(Movie movie);

    boolean deleteMovie(String id);
}
