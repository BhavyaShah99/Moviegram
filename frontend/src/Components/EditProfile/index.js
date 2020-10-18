import React from "react";
import "./styles.css";
import "./../universalStyles.css"
import { Button, Form } from "react-bootstrap";
// import photo from './ballon_dor.jpg'
import Modal from 'react-modal';
import { updateUserImage, updateDescription, readCookie, getUser, updateFavoriteGenres } from './../../services/api'
import GenreSelector from '../GenreSelector'


class EditProfile extends React.Component {
  constructor(props) {
    // When the componenet is created
    super(props);
    this.genreNames = ["Supernatural",
                       "Fantasy",
                       "Crime",
                       "Action",
                       "Horror",
                       "Thriller",
                       "Comedy"]
    this.state = {
        username: "Harsh",
        showUpdateProfile: this.props.showFunction,
        newDescription: "",
        profilePic: "",
        genres:
              {Supernatural: false,
                Horror: false,
                Fantasy: false,
                Crime: false,
                Action: false,
                Thriller: false,
                Comedy: false
      },
      genresShow: false
    };
    this.updateProfile = this.updateProfile.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.changeProfilePicFunction = this.changeProfilePicFunction.bind(this)

  }

  handleDescriptionChange(event) {
    this.setState({newDescription:event.target.value})
  }

  updateProfile(e, queueComponent, closeFunc) {
    if(this.state.newDescription === ""){
      console.log("No inputs provided")
    }
    else {
       if (this.state.newDescription !== "") {
         updateDescription(this.state.currentUser, this.state.newDescription)
          queueComponent.setState({
            userDescription: this.state.newDescription});
      }
    }
    updateFavoriteGenres(this.state.currentUser, this.state.genres)
    let favGenText = "";
    const genres = this.state.genres
    for (const key of Object.keys(genres)) {
        if (genres[key]) {
          favGenText = favGenText + key +  ", "
        }
    }
    favGenText = favGenText.slice(0,favGenText.length - 2)
    queueComponent.setState({
      favoriteGenres: favGenText});
    closeFunc()

  }

  changeProfilePicFunction(event) {
      this.setState({profilePic:  URL.createObjectURL(event.target.files[0])});
  }

  async componentDidMount() {
    await readCookie(this)
    const username = this.state.currentUser
    const userData = await getUser(username);
    this.setState({genres: userData.data.favoriteGenres})
    Modal.setAppElement('body');
  }

  render() {
    const {queueComponent,cancelFunction} = this.props
    return (
      <div id="editProfileModal">
        <div id="pageHeader">
          Update Profile
        </div>
        <div className="editProfileBody">
        <React.Fragment>
              <form className="image-form" onSubmit={(e) => {
                  e.preventDefault();
                  updateUserImage(e.target, this.state.currentUser, queueComponent);
              }}>
                  <div className="image-form__field">
                      <label>Image:</label>
                      <input name="image" type="file" />
                  </div>
                  <Button
                      variant="primary"
                      type="submit"
                      className="image-form__submit-button"
                  >
                      Upload DP
                  </Button>

              </form>

          </React.Fragment>
          <Button
              variant="primary"
              type="submit"
              className="editGenresComponent"
              onClick={() => this.setState({genresShow: true})}
          >
              Edit Genres
          </Button>
          <GenreSelector signup={this}></GenreSelector>
          <Form className="descriptionForm">
            <Form.Group controlId="review.movieName">
              <Form.Label>Description:</Form.Label>
              <Form.Control type="review" as="textarea" rows="8" placeholder="Enter your Description" onChange={this.handleDescriptionChange}/>
            </Form.Group>
          </Form>


          <div className="buttons">
          <Button variant="primary" id="updateButton" onClick={(e) => this.updateProfile(e, queueComponent, cancelFunction)} type="submit">Update Profile</Button>
          <Button variant="primary" id="cancelButton" onClick={cancelFunction} type="submit">Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}


export default EditProfile;
