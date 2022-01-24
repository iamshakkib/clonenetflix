import Axios from 'axios';
// http://localhost:8080/api/movie/popular?page=1
const SPRING_API_URL = 'http://localhost:7777/api/v1/movie/';

class TMDBMovieApiService {
  getGenreList(genre) {
    return Axios.get(SPRING_API_URL + 'genre?genre=' + genre);
  }
  getDatasByGenre(genre) {
    // console.log('Listed genre values:', genre);
    return Axios.get(SPRING_API_URL + 'genre?genre=' + genre);
  }
  getYoutubeKey(id) {
    return Axios.get(SPRING_API_URL + 'video?id=' + id);
  }
  getMovieDetails(id) {
    return Axios.get(SPRING_API_URL + 'detail?id=' + id);
  }
  getCredits(id) {
    return Axios.get(SPRING_API_URL + 'credits?id=' + id);
  }
  getSimilarMovies(id) {
    return Axios.get(SPRING_API_URL + 'similar?id=' + id);
  }
  getAllMovies(page) {
    return Axios.get(SPRING_API_URL + 'toprated?page=' + page);
  }
  getPopularMovies(page) {
    return Axios.get(SPRING_API_URL + 'popular?page=' + page);
  }
}

export default new TMDBMovieApiService();
