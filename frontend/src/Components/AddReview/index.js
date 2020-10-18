import React from "react";
import "./styles.css";
import "./../universalStyles.css"
import { Button, Form } from "react-bootstrap";
import { uid } from "react-uid";
import ErrorModal from './../ErrorModal';
import { addReview,getMovieByName,getKeyMoviePairs,readCookie } from './../../services/api'

class AddReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = { movie: "",
                   review: "",
                   movies: [],
                   turnAlert: false,
                   error: "",
                   spoiler: false};
    this.saveReview = this.saveReview.bind(this)
    this.handleMovieNameChange = this.handleMovieNameChange.bind(this)
    this.handleReviewContentChange = this.handleReviewContentChange.bind(this)
    this.handleSpoilerChange = this.handleSpoilerChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  async componentDidMount() {
    await readCookie(this)
    const res = await getKeyMoviePairs()
    if(!res){
        this.setState({movies: []})
    } else{
        const data = res.data
        const movieNames = data.map(obj => {return obj.title})
        movieNames.unshift("--Select Movie--")
        this.setState({movies: movieNames})
    }
  }

  closeModal(){
   this.setState({turnAlert: false})
  }

  async saveReview(queue, closeFunc, authenticateduser) {
    if(this.state.review === "" || this.state.movie === "" || this.state.movie === "--Select Movie--"){
      this.setState({error: "Cannot post an empty/incomplete review. Make sure to fill in all fields"})
      this.setState({turnAlert: true})
    } else {

      let movie = await getMovieByName(this.state.movie)
      movie = movie.data
      let newReview = { username: authenticateduser, movie_title: this.state.movie, content: this.state.review,
                          spoilers: this.state.spoiler, date: new Date().toLocaleString(), movie_id: movie._id}
      await addReview(newReview)
      newReview.image_url = this.props.profImg
      newReview.comments = []
      newReview.upvoters = []
      newReview.downvoters = []
      newReview.upvotes = 0
      newReview.downvotes = 0
      let existingRevs = queue.state.reviews
      existingRevs.unshift(newReview)
      queue.setState({reviews: existingRevs})
      closeFunc();
    }
  }

  handleMovieNameChange(event) {
    this.setState({movie:event.target.value.trim()})
  }

  handleReviewContentChange(event) {
    this.setState({review:event.target.value})
  }

  handleSpoilerChange() {
    this.setState({spoiler: !(this.state.spoiler)})
  }

  render() {

    const { queueComponent, cancelFunction, profImg, authenticateduser } = this.props

    // variables needed for dropdown menu
    const Data = this.state.movies

    return (
      <div id="addRevMain">

         <div id="pageTitle">
            <h3 id="header">Add a New Review</h3>
         </div>

         <div id="add-review">
            <ul>
              <li><img className="reviewUserPic" src={profImg} alt="User DP"/></li>
              <li>{authenticateduser}</li>
            </ul>

            <Form id="addReviewForm">
              <Form.Group controlId="review.movie">
                <Form.Label>Movie</Form.Label>
                <select id="selectMovie" onChange={this.handleMovieNameChange}>
                  {Data.map(function(X) {
                              return <option key={uid(X)}>{X}</option>;
                  })}
                </select>
              </Form.Group>
              <Form.Group controlId="review.reviewContent">
                <Form.Label>Review</Form.Label>
                <Form.Control type="review" as="textarea" rows="8" placeholder="Add your Review here" onChange={this.handleReviewContentChange}/>
              </Form.Group>
              <Form.Group controlId="review.spoiler">
                <Form.Check type="checkbox" id="spoilerCheck">
                  <Form.Check.Input onChange={this.handleSpoilerChange} type="checkbox" isValid />
                  <Form.Check.Label>Spoilers?</Form.Check.Label>
                </Form.Check>
              </Form.Group>
            </Form>
            <Button variant="primary" id="saveReviewBtn" onClick={() => this.saveReview(queueComponent, cancelFunction, authenticateduser)} type="submit">Post Review</Button>
            <Button variant="primary" id="cancelAddRevPage" onClick={cancelFunction} type="submit">Cancel</Button>
            <ErrorModal closeModal={this.closeModal} show={this.state.turnAlert} error={this.state.error}></ErrorModal>
        </div>

      </div>
    );
  }
}

export default AddReview;
