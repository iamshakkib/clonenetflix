import Axios from 'axios';

const API_URL = 'http://localhost:7777/user/v1/mylist';

class FavoriteMovieApiService {
    fetchMovie(userId) {
        return Axios.get(API_URL + '/allmovies/' + userId);
    }

    // fetchMovie() {
    //     return Axios.get(API_URL);
    // }
    
    addMovie(movie) {
        return Axios.post(API_URL+'/add', movie);
    }
    
    removeMovie(id) {
        return Axios.delete(API_URL + '/delete/' + id);
    }

    /*removeMovie2(movie_id) {
        return Axios.delete(API_URL + '/' + movie_id);
    }

    isMovie(movie_id) {
        return Axios.get(API_URL + '/' + movie_id);
    }*/

}

export default new FavoriteMovieApiService();
