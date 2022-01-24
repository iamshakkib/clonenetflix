import Axios from "axios";

const API_URL = "http://localhost:7777/user/v1/comment"; //spring boot back-end url

class CommentApiService {
  writeMovieComment(comment) {
    return Axios.post(API_URL + "/write", comment);
  }
  getCommentList(movie_id) {
    return Axios.get(API_URL + "/all/" + movie_id);
  }
  deleteComment(id) {
    return Axios.get(API_URL + "/delete/=" + id);
  }
}

export default new CommentApiService();
