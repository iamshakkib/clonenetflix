import React, { Component } from 'react';
import DetailContent from './DetailContent';
import '../styles/Detail.css';
import FavoriteMovieApiService from '../apis/FavoriteMovieApiService';


class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state={
            user_id : window.sessionStorage.getItem("user"),
        }
    }
    
    componentDidMount(){
        this.loadFavoriteMovie();
    }
    //according to user ID this.loadFavoriteMovie()run the function
    loadFavoriteMovie = async () => {
        //After deleting, delete the movie data in the remaining list (because of the error that the image of Jiwoonhwa remains and needs to be refreshed to work normally) and reloaded from below
        this.setState({movies:''})
        console.log('User ID: ', this.state.user_id);

        await FavoriteMovieApiService.fetchMovie(this.state.user_id)
            .then(res => {
                console.log(res.data);
                this.setState({movies:res.data},()=>{
                    console.log(this.state.movies);
                })
                
            });

        };

    render() {
        return (
            <section className='bg-color'>
            <div
            className='container-fluid'
            style={{background: '#181818', flex: 1}}
            >
                <div className='row'>
                    <div className='col'>
                        <div className="container-fluid" style={{backgroundColor: '#181818'}}>
                            <div className="container">
                                <h3 style={{color: 'white', fontWeight: 'bold', marginBottom: 20}}>my wish list</h3>
                                <div className="row">
                                    {this.state.movies ? this.state.movies.map((item) => {
                                        return (
                                            <DetailContent
                                                user_id={this.state.user_id}
                                                databaseid={item.id}
                                                id={item.movie_id}
                                                movie={item}
                                                loadFavoriteMovie={this.loadFavoriteMovie}
                                            ></DetailContent>
                                        );                                
                                        })
                                    :''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

export default Favorite;
