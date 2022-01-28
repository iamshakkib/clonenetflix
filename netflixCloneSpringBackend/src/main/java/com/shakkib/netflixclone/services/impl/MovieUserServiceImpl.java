package com.shakkib.netflixclone.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shakkib.netflixclone.daos.MovieDao;
import com.shakkib.netflixclone.services.MovieUserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class MovieUserServiceImpl implements MovieUserService {
    MovieDao movieDao;

    @Override
    public String getMovieListByGenre(String genre, String page){
        //https://api.themoviedb.org/3/movie/550?api_key=b4eda142837c245432c018af5c4ec342
        switch (genre){
            case "Adventure":
                genre="12";
                break;
            case "Comedy":
                genre="35";
                break;
            case "Crime":
                genre="80";
                break;
            case "Documentary":
                genre = "99";
                break;
            case "Drama":
                genre = "18";
                break;
            case "Family":
                genre = "10751";
                break;
            case "Fantasy":
                genre = "14";
                break;
            case "History":
                genre = "36";
                break;
            case "Horror":
                genre = "27";
                break;
            case "Music":
                genre = "10402";
                break;
            case "Mystery":
                genre = "9648";
                break;
            case "Science_Fiction":
                genre = "878";
                break;
            case "TV_Movie":
                genre = "10770";
                break;
            case "Thriller":
                genre = "53";
                break;
            case "War":
                genre = "10752";
                break;
            case "Western":
                genre = "37";
                break;
            default:
                genre = "28";
                break;
        }
        String url = "http://api.themoviedb.org/3/discover/movie";
        String api_key = "b4eda142837c245432c018af5c4ec342";
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                                .queryParam("page",page)
                                .queryParam("with_genres",genre)
                                .queryParam("api_key",api_key)
                                .build(false);
        String uri = builder.toUriString();
        System.out.println(uri);
        ResponseEntity<String> response = rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class);
        return response.getBody().toString();
    }
    public String popularMovies(String page) {
        String url = "https://api.themoviedb.org/3/movie/popular";
        String api_key = "b4eda142837c245432c018af5c4ec342";
        String sort_by = "vote_count.desc";
        // RestTemplate
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .queryParam("sort_by", sort_by)
                .queryParam("api_key", api_key)
                .build(false);
        // false
        String uri = builder.toUriString();
        System.out.println(uri);
        ResponseEntity<String> response = rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class);
        return response.getBody().toString();
    }
    public String searchMoviesByQueryString(String page, String query) {
        //https://api.themoviedb.org/3/search/movie?api_key=b4eda142837c245432c018af5c4ec342&language=en-US&query=spiderman&page=1&include_adult=false
        String url = "https://api.themoviedb.org/3/search/movie";
        String api_key = "b4eda142837c245432c018af5c4ec342";
        // RestTemplate
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .queryParam("query", query)
                .queryParam("api_key", api_key)
                .build(false);
        // false
        String uri = builder.toUriString();
        ResponseEntity<String> response = rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class);
        return response.getBody().toString();
    }
    public String getTopratedMovies(String page) {
//			https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
        String api_key ="b4eda142837c245432c018af5c4ec342";
        String url = "https://api.themoviedb.org/3/movie/top_rated";

        // RestTemplate
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .queryParam("api_key", api_key)
                .build(false);
        String uri = builder.toUriString();
        System.out.println(uri);
        ResponseEntity<String> response =  rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class
        );
        return response.getBody().toString();
    }
    public String getAllMovies(String page) {
//			https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
        String api_key ="b4eda142837c245432c018af5c4ec342";
        String language = "ko-KR";
        String url = "https://api.themoviedb.org/3/discover/movie";

        // RestTemplate
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .queryParam("language", language)
                .queryParam("api_key", api_key)
                .build(false);
        String uri = builder.toUriString();
        System.out.println(uri);
        ResponseEntity<String> response =  rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class
        );
        return response.getBody().toString();
    }
    public String searchSimilarMoviesByid(String page,String id) {
//			https://api.themoviedb.org/3/movie/590706/similar?api_key=2daa7f8ee3c810361492a3382e06545d&page=1
        String api_key ="b4eda142837c245432c018af5c4ec342";
        String url = "https://api.themoviedb.org/3/movie/"+id+"/similar";

        // RestTemplate 생성
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .queryParam("api_key", api_key)
                .build(false);
        String uri = builder.toUriString();
        ResponseEntity<String> response =  rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class
        );
        return response.getBody().toString();
    }
    public String getMovieDetails(String id) {
//		https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
        String url = "https://api.themoviedb.org/3/movie/"+id;
        String api_key="b4eda142837c245432c018af5c4ec342";
        // RestTemplate 생성
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", api_key)
                .build(false);
        String uri = builder.toUriString();
        ResponseEntity<String> response =  rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class
        );
        System.out.println(response.getBody().toString());

        return response.getBody().toString();
    }
    public String getMovieCredits(String id) {
//		https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
        String url = "https://api.themoviedb.org/3/movie/"+id+"/credits";
        String api_key ="b4eda142837c245432c018af5c4ec342";
        // RestTemplate 생성
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", api_key)
                .build(false);
        String uri = builder.toUriString();
        ResponseEntity<String> response =  rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class
        );
        System.out.println(response.getBody().toString());

        return response.getBody().toString();
    }
    public Object getMovieImage(String id) throws JsonMappingException, JsonProcessingException {
        String url = "https://api.themoviedb.org/3/movie/" + id + "/images";
        String api_key ="2daa7f8ee3c810361492a3382e06545d";
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", api_key)
                .build(false);
        String uri = builder.toUriString();
        ResponseEntity<String> response =  rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class
        );
        Map<String, Object> map = new HashMap<>();
        Object temp = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(response.getBody().toString());
        map = objectMapper.readValue(response.getBody().toString(), new TypeReference<Map<String,Object>>() {
        });
        System.out.println(map);
        temp =map.get("backdrops");
        return temp;
    }
    public String getRealMovieImage(String image){
        String url = "http://image.tmdb.org/t/p/w500/"+image;
        URI uri = null;
        try{
            uri = new URI(url);
            System.out.println(uri);
        }catch (URISyntaxException e){
            e.printStackTrace();
        }
        return uri.toString();
    }
    public String getMovieVideo(String id){
        String url = "https://api.themoviedb.org/3/movie/"+id+"/videos";
        String api_key = "b4eda142837c245432c018af5c4ec342";
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                                                    .queryParam("api_key",api_key)
                                                    .build(false);
        String uri = builder.toUriString();
        ResponseEntity<String> response = rt.exchange(uri,HttpMethod.GET,null,String.class);
        System.out.println(response.getBody().toString());
        return response.getBody().toString();
    }
    public String getSortByMovies(String page, String sort) {
//		https://api.themoviedb.org/3/discover/movie?api_key=2daa7f8ee3c810361492a3382e06545d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
        String url = "https://api.themoviedb.org/3/discover/movie";
        String api_key = "b4eda142837c245432c018af5c4ec342";
        RestTemplate rt = new RestTemplate();
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("page", page)
                .queryParam("sort_by", sort)
                .queryParam("api_key", api_key)
                .build(false);
        // false
        String uri = builder.toUriString();
        ResponseEntity<String> response = rt.exchange(
                uri,
                HttpMethod.GET,
                null,
                String.class);
        return response.getBody().toString();
    }
}
