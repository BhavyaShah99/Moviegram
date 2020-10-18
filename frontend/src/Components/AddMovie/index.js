import React from "react";
import "./styles.css";
import "./../universalStyles.css"
import { Button, Form } from "react-bootstrap";
import GenreSelector from '../GenreSelector'
import ErrorModal from './../ErrorModal';
import { addMovie } from './../../services/api'


class AddMovie extends React.Component {
  constructor(props){
    super(props);
    this.genreNames = ["Supernatural",
                       "Fantasy",
                       "Crime",
                       "Action",
                       "Horror",
                       "Thriller",
                       "Comedy",
                       "Drama",
                       "Romantic",
                       "Science Fiction",
                       "Animation"]
    this.state = {title: "",
                  director: "",
                  stars: [],
                  description: "",
                  poster: "",
                  turnAlert: false,
                  error: "",
                  genresShow: false,
                  genres:
                     {Supernatural: false,
                      Horror: false,
                      Fantasy: false,
                      Crime: false,
                      Action: false,
                      Thriller: false,
                      Comedy: false,
                      Drama: false,
                      Romantic: false,
                      "Science Fiction": false}
                }
    this.handleMovieNameChange = this.handleMovieNameChange.bind(this)
    this.handleDirectorChange = this.handleDirectorChange.bind(this)
    this.handleCastChange = this.handleCastChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePosterChange = this.handlePosterChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.save_Movie = this.save_Movie.bind(this)

  }

  closeModal(){
   this.setState({turnAlert: false})
  }

  handleMovieNameChange(event) {
    this.setState({title:event.target.value})
  }
  handleDirectorChange(event) {
    this.setState({director:event.target.value})
  }
  handleCastChange(event) {
    const stars_arr = event.target.value.split(",");
    this.setState({stars:stars_arr});
  }
  handleDescriptionChange(event) {
    this.setState({description:event.target.value});
  }
  handlePosterChange(event) {
    this.setState({poster:event.target.value});
  }

  async save_Movie (title, director, stars, description, genres, poster, closeFunction) {
    if(this.state.director === "" || this.state.title === ""){
      this.setState({error: "Cannot post an empty/incomplete movie. Make sure to fill in all fields"})
      this.setState({turnAlert: true})
    } else {
      await addMovie(title, director, stars, description, genres, poster)
      closeFunction();
    }
  }

  render() {
    const {cancelFunction} = this.props;
    return(
      <div id = "AddMovieMain">

        <div className = "Add-Movie">
          <div className="Header">
            <h3 className="headerText">Add a New Movie</h3>
          </div>
          <Form className="MovieForm">
            <Form.Group>
              <Form.Label>Movie</Form.Label>
              <Form.Control type="name" placeholder="Movie Name" onChange={this.handleMovieNameChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Director</Form.Label>
              <Form.Control type="name" placeholder="Director's Name" onChange={this.handleDirectorChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cast</Form.Label>
              <Form.Control type="list" placeholder="Enter the Stars seperated by comma" onChange={this.handleCastChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Movie Poster</Form.Label>
              <Form.Control type="list" placeholder="Paste the URL of the image here" onChange={this.handlePosterChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="description" as="textarea" rows="8" placeholder="Add a description for the movie" onChange={this.handleDescriptionChange}/>
            </Form.Group>
          </Form>
          <GenreSelector signup={this}></GenreSelector>
          <Button variant="primary" className="addGenreButton" onClick={() => this.setState({genresShow: true})}>
            Add Genres
          </Button>
          <Button variant="primary" className="saveReviewBtn" onClick={() => this.save_Movie(this.state.title, this.state.director, this.state.stars,
          this.state.description, this.state.genres, this.state.poster, cancelFunction)} type="submit">Add Movie</Button>
          <Button variant="primary" className="cancelAddMoviePage" onClick={cancelFunction} type="submit">Cancel</Button>
          <ErrorModal closeModal={this.closeModal} show={this.state.turnAlert} error={this.state.error}></ErrorModal>
        </div>
      </div>
    )
  }
}

export default AddMovie;
