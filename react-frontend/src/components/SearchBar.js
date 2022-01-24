import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';

class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            movies: [],
            title: '',
            searchTerm: '',
            totalResults: 0,
        }
        this.apiKey = '1027a01020b01c3266e0531dc4542a8a'
    }
    
    handleChange = (e) => {
      this.setState({searchTerm: e.target.value})
    }

    moveSearchMovie = () => {
        document.location.href='searchMovie';
    }

    handleSubmit = (e) => {
      e.preventDefault();
      if (sessionStorage.getItem("movies") != null) {
          //When re-searching, delete the previously searched data from the session value and search again
          sessionStorage.removeItem("movies");
          if(this.state.searchTerm !== '') {
              fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
              .then(data => data.json())
              .then(data => {
                console.log(data);
                this.setState({movies: [data.results]})
                window.sessionStorage.setItem("movies", JSON.stringify(this.state.movies));
                this.moveSearchMovie();
                // After saving the data value in setItem, execute the move search movie function
            })
          }// if end
          else {
              alert('Please enter a search term');
          }// else end
        }// if end
      else if (sessionStorage.getItem("movies") == null) {
            if(this.state.searchTerm !== '') {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
                  .then(data => data.json())
                  .then(data => {
                    console.log(data);
                    this.setState({movies: [data.results]})
                    window.sessionStorage.setItem("movies", JSON.stringify(this.state.movies));
                    this.moveSearchMovie();
                    // After saving the data value in setItem, execute the move search movie function
                  })
              }//if end 
              else {
                  alert('Please enter a search term');
              }// else end
            }//else if end
    }//handlesubmit end

    render() {
        return (
            <div>
                <form className="form-inline" action="" onSubmit={this.handleSubmit}>
                    <div className="input-field0">
                        <input
                            className="form-control mr-sm-2"
                            type="text" placeholder="Search"
                            onChange={this.handleChange}
                        />
                        <button
                            className="btn btn-success"
                            type="submit"
                            // onClick={this.moveSearchMovie}
                            // If I write here, when I press the button
                            // Handle Submit and Move Search Movie
                            // Before running together to receive data
                            //It may be skipped. Lines 36 to 7
                            // Save the data and move to the screen showing the searched movies
                        >
                            <Icon.Search/>
                        </button>
                            {/* <SearchMovie movies={this.state.movies} /> */}
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;