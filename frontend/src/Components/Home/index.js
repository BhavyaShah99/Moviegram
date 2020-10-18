import React from 'react';
import './styles.css'
import { Button} from "react-bootstrap";
import { uid } from "react-uid";
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar'
import GenreSearchBar from '../GenreSearchBar'
import MovieCardList from '../MovieCardList';
import { getAllMovies } from './../../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {movies: []};
    this.splitMovies = this.splitMovies.bind(this)
  }

  splitMovies(movieList) {
    let result = [];
    for (let i = 0; i < movieList.length; i += 4) result.push(movieList.slice(i, i + 4));
    return result;

  }
  async componentDidMount() {
    const movieList = await getAllMovies();
    const list = this.splitMovies(movieList.data)
    this.setState({movies: list})
  }


    render() {
      const movieListGrouped = this.state.movies.map((group) =>
        <div className="movieList">
            <MovieCardList key={uid(group)}
                           movies = {group}
                           queueComponent = {this}
                           history={this.props.history}/>
        </div>
      );

      return (

          <div className="HomeContent">
            <div className="Banner">
              <img src={require("./static/Banner.jpg")} alt={"Welcome to MovieGram"}/>

            </div>
            <div id="searchMovieform">
              <SearchBar history={this.props.history}/>
            </div>
            <div id="searchGenreform">
              <GenreSearchBar history={this.props.history}/>
            </div>
            <div className="spacingBox">

            </div>
            <div className="Login_Signup">
                <Button as={Link} to="/login" type="submit">Login/Signup</Button>
            </div>
            <div className="spacingBox">

            </div>
            <div className="movieHeader">
             <h3 id="movieHeader">Browse Movies</h3>
            </div>
            {movieListGrouped}

          </div>

      );
    }
  }

  export default Home;
