package com.shakkib.netflixclone.services.impl;

import com.shakkib.netflixclone.daos.MovieDao;
import com.shakkib.netflixclone.entities.Movie;
import com.shakkib.netflixclone.exceptions.MovieDetailsNotFoundException;
import com.shakkib.netflixclone.exceptions.UserDetailsNotFoundException;
import com.shakkib.netflixclone.services.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class MovieServiceImpl implements MovieService {
    MovieDao movieDao;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Override
    public List<Movie> fetchMovie(String user_id) throws MovieDetailsNotFoundException {
        System.out.printf("Finding movies of userList %s%n",user_id);
        List<Movie> list =  movieDao.findAllByUserId(user_id).orElseThrow(()->new MovieDetailsNotFoundException("Movie with id does not exists"));
        System.out.printf("Returning the saved movies of users %s%n",list.size());
        return list;
    }

    @Override
    public Movie addMovie(Movie movie) {
        Movie movie1 = movieDao.save(movie);
        return movie1;
    }

    @Override
    public boolean deleteMovie(String id) {
        movieDao.deleteById(id);
        return true;
    }

    public Boolean checkUser(String user_id) throws UserDetailsNotFoundException {
        return userServiceImpl.checkUserByUserId(user_id);
    }
}
