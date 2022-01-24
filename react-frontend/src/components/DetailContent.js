import React, { Component } from "react";
import { Modal } from "reactstrap";
import TMDBMovieApiService from "../apis/TMDBMovieApiService";
import FavoriteMovieApiService from "../apis/FavoriteMovieApiService";
import CommentApiService from "../apis/CommentApiService";
import * as Icon from "react-bootstrap-icons";
import Comments from "./Comments";

class DetailContentCompoent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      id: this.props.id,
      movie: this.props.movie,
      modal: false, //Default modal value false
      details: {},
      genres: [],
      //// Show the poster image as it is
      poster_image:
        "http://image.tmdb.org/t/p/w500" + this.props.movie.poster_path,
      content: "", //comment
    };
  }
 //Add to wish list
 handleMovieSave = async () => {
  var temp = {
    movie_id : this.state.id,
    movie_original_title : this.props.movie.original_title,
    poster_path : this.props.movie.poster_path,
    user_id : window.sessionStorage.getItem("user"),
    //user_email : JSON.parse(window.sessionStorage.getItem("user")).userEmail,
  };
  console.log(temp);
  // Save only when there is a user session value (login)
  if(sessionStorage.getItem('user') != null){
    await FavoriteMovieApiService.addMovie(temp)
      .then(res => {
        console.log(res.data);
        //// Determining whether the movie is on my wish list or not.
        if (res.data === 'success') {
          console.info('save success', this.props.databaseid);
          alert("I wished");
          this.setState({
            modal: false,
          })
        } else {
          alert("It's already on your wishlist.");
          this.setState({
            modal: false,
          })
        }
      })
      .catch(err => {
        console.error('ApiService.addMovies Error', err);
        alert('Wish list save error\nPlease contact the administrator');
      })
      ////If you are not logged in, move to the login screen when you click the wish button
  } else {
    alert('It is available after login.');
    window.location.href="http://localhost:3000/login";
  }
}

  //delete wish list
  handleMovieDelete = async () => {
    
    await FavoriteMovieApiService.removeMovie2(this.state.id)
    .then(res => {
      console.info('deletion success', res.state);
      console.log(res.data);
      if(res.data === 'success') {
        alert("Deleted.");
        //When deleting from the My Favorites page
        if(document.location.href === "http://localhost:3000/myContent") {
          this.props.loadFavoriteMovie();
          this.setState({
            modal: false,
          });
        }
        else {  //When deleting from another screen
          this.setState({
            modal: false,
          });
        }
      }
      else {  // When you click the delete button on the unlisted list
        alert('Its not on my wish list.');
        return;
      }
    })
    .catch(err => {
      console.error('ApiService.removeMovie Error', err);
      alert('Wish list deletion error\nPlease contact the administrator');
    })
}

  //A method that calls all necessary data when an image is clicked
  getAllInfo = () => {
    this.getMovieDetails();
    this.getMoviesYoutubeKey();
    this.getMovieCredits();
    this.getCommentList();
  };

  //Method to get movie details
  getMovieDetails = async () => {
    let res = await TMDBMovieApiService.getMovieDetails(this.state.id);
    let genres = res.data.genres.map((item) => {
      return item.name;
    });
    this.setState(
      {
        details: res.data,
        genres: genres,
      },
      () => {
        console.log("Details value when clicked!", this.state.details);
        console.log("this.state.poster_image : ", this.state.poster_image);
        // console.log('Genre value when pressed!', this.state.genres);
      }
    );
  };
  //Method to get YouTube key value
  getMoviesYoutubeKey = async () => {
    let res = await TMDBMovieApiService.getYoutubeKey(this.state.id);
    //If there is a YouTube video, save the key value
    if (res.data.results[0] !== undefined) {
      console.log("youtubeKey data:", res.data.results[0].key);
      //Only one representative YouTube video was brought and saved.
      this.setState(
        {
          key:
            "https://youtube.com/embed/" +
            res.data.results[0].key +
            "?autoplay=1&controls=0&rel=0&loop=1",
        },
        () => {
          // console.log('youtubeKey value when pressed!', this.state.key);
        }
      );
      //If it does not exist, the key is stored as false.
    } else {
      this.setState({ key: false });
    }
  };
  //Method to get the list of participating actors
  getMovieCredits = async () => {
    let res = await TMDBMovieApiService.getCredits(this.state.id);
    let cast = res.data.cast.slice(0, 6).map((item) => {
      return item.name;
    });
    // console.log('Participating staff information:', res.data);
    // console.log('Participating actors:', res.data.cast);
    this.setState(
      {
        cast: cast,
      },
      () => {
        // console.log('Cast value when pressed!', this.state.cast);
      }
    );
  };

  //Method to get list of comments
  getCommentList = async () => {
    let res = await CommentApiService.getCommentList(this.state.id);
    let commentList = res.data;
    this.setState({ comments: commentList }, () => {
      console.log("Comment information!!!!");
      console.log(this.state.comments);
    });
  };
  //A method that converts the received array into a comma-separated string.
  seperactor = (Array) => {
    var seperactor = ",";
    var tempString = "";
    for (var i = 0; i < Array.length; i++) {
      if (i < Array.length - 1) {
        tempString += Array[i] + seperactor;
      } else if (i === Array.length - 1) {
        tempString += Array[i];
      }
    }
    return tempString;
  };

  //A method that reverses true and false values
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  //State handler according to content change when commenting
  handleText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //Write a comment
  writeMovieComment = () => {
    let user_id = sessionStorage.getItem("user");
    //Check the session value to see if you are logged in
    if (user_id == null) {
      alert("Login is required");
      //Send to login page
      window.location.href = "http://localhost:3000/login";
    }
    let content = this.state.content;
    //객체생성
    let comment = {
      movie_id: this.state.id,
      user_id: user_id,
      content: content,
    };
    //object creation
    CommentApiService.writeMovieComment(comment)
      .then((res) => {
        console.log(res.data);
        let result = res.data;
        if (result === 1) {
          alert("Completion of comment");
          this.getCommentList();
          //Reset your comments
          this.setState({ content: "" });
        }
      })
      .catch((err) => console.log(err));
  };
  //Delete comment
  deleteComment = (id, user_id) => {
    // console.log(typeof this.props.user_id); //number
    // console.log(typeof sessionStorage.getItem("user")); //string
    console.log(id); //ID value of the comment!
    console.log(user_id);
    //If the logged in user and the commenter are the same person, it can be deleted
    if (sessionStorage.getItem("user") === user_id.toString()) {
      CommentApiService.deleteComment(id)
        .then((res) => {
          console.log(res.data); //deletion success
          if (res.status === 200) {
            alert("Comment has been deleted");
            //Reload the comment list after deletion
            this.getCommentList();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <div>
        <div className="btn bg-transparent" onClick={this.toggle}>
          {/* {images} */}
          {this.state.poster_image === "http://image.tmdb.org/t/p/w500null" ? (
            <img
              alt=""
              src={"https://i.ytimg.com/vi/GV3HUDMQ-F8/maxresdefault.jpg"}
              height="270"
              width="180"
              style={{ margin: "5px" }}
            />
          ) : (
            <img
              src={this.state.poster_image}
              width="180px"
              alt="new"
              style={{ borderRadius: 5 }}
              onClick={this.getAllInfo}
            />
          )}
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          className="my-modal"
          style={{ maxWidth: "900px", width: "80%" }}
        >
          <div className="container">
            <div className="row">
              <div
                onClick={this.toggle}
                style={{
                  paddingRight: "10px",
                  margin: "5px",
                  textDecoration: "none",
                  color: "#777777",
                  fontWeight: "bold",
                  fontSize: "x-large",
                  flex: "1",
                  textAlign: "right",
                }}
              >
                <Icon.XCircleFill />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="vedio">
                  {this.state.key ? (
                    <iframe
                      title="Youtube Video Player"
                      className="video"
                      allowFullScreen
                      frameBorder="0"
                      style={{
                        width: "100%",
                        height: "50vh",
                        margin: 0,
                        padding: 0,
                      }}
                      allow="autoplay"
                      src={this.state.key}
                    ></iframe>
                  ) : (
                    "There is no Youtube video"
                  )}

                  <div>
                    <h1 style={{ color: "white" }}>
                      {this.state.details && this.state.details.title}
                    </h1>
                    <div style={{ flexDirection: "row" }}>
                      <input
                        className="btn btn-light btn-lg"
                        type="button"
                        value="▶ play"
                        style={{ margin: 5 }}
                        onClick={() =>
                          window.open(`${this.state.key}`, "_blank")
                        }
                      />
                      <input
                          className="btn btn-light btn-lg"
                          type="button"
                          value="❤"
                          style={{ margin: 5, borderRadius: 20 }}
                          onClick={() => this.handleMovieSave()}
                        />
                      {sessionStorage.getItem("user") != null ?
                        <input
                          className="btn btn-light btn-lg"
                          type="button"
                          value="❌ "
                          style={{ margin: 5, borderRadius: 20 }}
                          onClick={() => this.handleMovieDelete(this.state.id)}
                        />
                        :''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingLeft: "24px", marginTop: 15 }}>
              <div className="col-8">
                <div className="content1">
                  <p className="contentFont">
                    {this.state.details.release_date &&
                      this.state.details.release_date}{" "}
                    {this.state.details.runtime && this.state.details.runtime}분
                  </p>
                  <p className="contentFont" style={{ marginTop: 15 }}>
                    {this.state.details.overview
                      ? this.state.details.overview
                      : "No plot summary"}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className="content2">
                  <div style={{ flexDirection: "row", marginBottom: 10 }}>
                    <div style={{ textDecoration: "none", color: "#777777" }}>
                      출연
                    </div>
                    <div className="detailFont">
                      {this.state.cast && this.seperactor(this.state.cast)}
                    </div>
                  </div>
                  <div style={{ flexDirection: "row", marginBottom: 10 }}>
                    <div style={{ textDecoration: "none", color: "#777777" }}>
                      장르
                    </div>
                    <div className="detailFont">
                      {this.state.genres && this.seperactor(this.state.genres)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingLeft: "24px", marginTop: 20 }}>
              <div className="col">
                <form className="form-inline" style={{ width: "100%" }}>
                  <textarea
                    placeholder="Please enter a comment"
                    className="form-control"
                    rows="2"
                    cols="100"
                    name="content"
                    value={this.state.content}
                    onChange={(e) => this.handleText(e)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    style={{ margin: 10 }}
                    onClick={() => this.writeMovieComment()}
                  >
                    댓글
                  </button>
                </form>
                <div className="comment">
                  {this.state.comments
                    ? this.state.comments.map((item) => {
                        return (
                          <Comments
                            key={item.id}
                            id={item.id}
                            movie_id={item.movie_id}
                            user_id={item.user_id}
                            content={item.content}
                            deleteComment={this.deleteComment}
                          />
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DetailContentCompoent;
