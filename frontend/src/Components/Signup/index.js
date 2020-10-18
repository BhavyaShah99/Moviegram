import React from 'react';
import './styles.css';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {readCookie} from '../../services/api'
import Avatar from '@material-ui/core/Avatar';
import GenreSelector from '../GenreSelector'
import ErrorModal from '../ErrorModal'
import {signup, uploadImageDB} from '../../services/api'
import MainMenuBar from './../MainMenuBar';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.genreNames = ["Supernatural",
                       "Fantasy",
                       "Crime",
                       "Action",
                       "Horror",
                       "Thriller",
                       "Comedy"]
    this.state = {turnAlert: false,
      username: "", email: "", password: "", genresShow: false, genres:
            {Supernatural: false,
              Horror: false,
              Fantasy: false,
              Crime: false,
              Action: false,
              Thriller: false,
              Comedy: false
    }};
    this.changeEmail = this.changeEmail.bind(this);
    this.changeUsername = this.changeUsername.bind(this);

    this.buttonClick = this.buttonClick.bind(this);
    this.passwordChange = this.passwordChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  changeEmail(e) {
    this.setState({email: e.target.value});
 }
  changeUsername(e) {
  this.setState({username: e.target.value});
}
 closeModal(){
   this.setState({turnAlert: false})
 }
  passwordChange(e) {
      this.setState({password: e.target.value});
  }

  async buttonClick(){
    if(this.state.username === ""){
      this.setState({turnAlert: true})
      this.setState({error: "Please enter your username."})
    } else if(this.state.email === ""){
      this.setState({turnAlert: true})
      this.setState({error: "Please enter your email."})
    } else if(this.state.password === ""){
      this.setState({turnAlert: true})
      this.setState({error: "Please enter your password."})
    } else{
      await signup({username: this.state.username,
        email: this.state.email,
        genres: this.state.genres,
        password: this.state.password,
        image_url: this.state.srcImage}, this)
    }
  }
  handleUpload(e){
    // Change avatar image
    e.preventDefault();
    uploadImageDB(e.target, this);
  }

  renderRedirect(){
    if(this.state.currentUser){
      this.props.history.push("/Newsfeed")
    }
  }
  render() {
    return (
    <div>
      {this.renderRedirect()}
      <MainMenuBar username={this.state.currentUser}/>
      <div className="formContainer">


        <Form className="form">
          <Form.Group className="welcomeText">
            <Form.Label className="centerText">Signup</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={this.changeUsername} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.changeEmail} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.passwordChange} />
          </Form.Group>

          <Button variant="outline-primary"
                    id="addGenreButton"
                    onClick={() => this.setState({genresShow: true})}
                    >
                    Add Genres
                  </Button>
          <Form.Group className="centerAvatar">
                <Avatar id="avatar" alt="Remy Sharp" src={this.state.srcImage}/>
          </Form.Group>
          <Form.Group>
            <Form.Label className="selectImage">Select your profile picture</Form.Label>
            <div>
            <React.Fragment>
                  <form className="image-form" onSubmit={ (event) => this.handleUpload(event) }
                  >
                      <div className="image-form__field">

                          <input name="image" type="file" />
                      </div>
                      <Button
                          variant="primary"
                          type="submit"
                          id="uploadDP"
                      >
                          Upload Profile Picture
                      </Button>

                  </form>

              </React.Fragment>
            </div>
          </Form.Group>
          {/* When the user presses this button, the data will be sent to the
          database and create a new user */}
            <Button variant="outline-primary"
                            onClick={this.buttonClick}
                             className="loginButton">
              Signup
            </Button>
            <div className="registeredButtonBox">
              <Button className="alreadyRegisteredButton" as={Link} to="/login"
              type="submit">Already registered?</Button>
            </div>
      </Form>
        <GenreSelector signup={this}></GenreSelector>
        <ErrorModal closeModal={this.closeModal} show={this.state.turnAlert}
                error={this.state.error}></ErrorModal>
      </div>

    </div>




    );
  }
}

  export default SignupScreen;
