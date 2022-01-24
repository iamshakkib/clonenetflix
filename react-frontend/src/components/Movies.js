import React, { Component } from 'react';
import TMDBMovieApiService from '../apis/TMDBMovieApiService';
import MoviesRow from './MoviesRow';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      title: 'Movie List',
    };
  }

  getAllMovies = async () => {
    this.setState({
      movies: '',
    });
    let res = await TMDBMovieApiService.getAllMovies(this.state.page);
    console.log(res.data);
    let page = this.state.page;
    let totalpage = res.data.total_pages;
    let totalresults = res.data.total_results;
    let movies = res.data.results;
    this.setState(
      {
        page: page,
        movies: movies,
        totalpage: totalpage,
        totalresults: totalresults,
      },
      () => {
        console.log(this.state.page);
        console.log(this.state.movies);
        console.log(this.state.totalpage);
        console.log(this.state.totalresults);
      },
    );
  };
  componentDidMount() {
    this.getAllMovies();
  }
  pageHandler = ({ number }) => {
    if (number === this.state.page) {
      alert('This is the current page');
      return;
    }
    if (number === this.state.totalpage || number > this.state.totalpage) {
      alert('This is the last page');
      return;
    }
    this.setState({ page: number }, () => {
      this.getAllMovies();
    });
    // console.log(number);
    // console.log('change page??');
  };
  render() {
    return (
      <div className="container-fluid" style={{backgroundColor: '#181818'}}>
        <div className="container">
          <div className="row">
            <div className="col">
              <MoviesRow
                title={this.state.title}
                movies={this.state.movies}
                totalpage={this.state.totalpage}
                page={this.state.page}
                totalresults={this.state.totalresults}
                pageHandler={this.pageHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
