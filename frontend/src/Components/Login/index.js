import React from 'react';
import './styles.css';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {login} from '../../services/api'
import ErrorModal from '../ErrorModal'
import MainMenuBar from './../MainMenuBar';
import {readCookie} from '../../services/api'

class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      readCookie(this)

      this.renderRedirect = this.renderRedirect.bind(this)

      this.state = {turnAlert: false, username: "", password: ""};
      this.changeUser = this.changeUser.bind(this);
      this.passwordChange = this.passwordChange.bind(this)
      this.buttonClick = this.buttonClick.bind(this);
      this.closeModal = this.closeModal.bind(this)

    }

    changeUser(e) {
      this.setState({username: e.target.value});
   }
   closeModal(){
    this.setState({turnAlert: false})
   }
l
   passwordChange(e) {
      this.setState({password: e.target.value});
   }

    buttonClick(app){
      // Handles logging into the site.
      login(this, app).then(user => {
        app.setState({currentUser: user.currentUser})
        if(app.state.currentUser != null){
          this.props.history.push({pathname: "/NewsFeed",
          state: {username: this.state.username}})
        }
    }).catch(error => {
      this.setState({turnAlert: true})
      this.setState({error: "Either the username or password is wrong."})
    })}

    renderRedirect(){
      if(this.state.currentUser){
        this.props.history.push("/Newsfeed")
      }
    }
    render() {
      const { app } = this.props
      return (
        <div>
          {this.renderRedirect()}
          <MainMenuBar username={this.state.currentUser}/>
          <div className="pageM">
          {/* {this.renderRedirect()} */}
          <Form className="form">
            <Form.Group className="welcomeText">
              <Form.Label >Welcome to MovieGram</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Control type="username"
                            placeholder="Enter username"
                            onChange={this.changeUser}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password"
                            placeholder="Password"
                            onChange={this.passwordChange} />
            </Form.Group>

              <Button variant="outline-primary"
                      className="loginButton"
                      onClick={() => this.buttonClick(app)}>
                Login
              </Button>

            <div className="notRegisteredButtonBox">
              <Button className="notRegisteredButton" as={Link}
                      to="/signup" type="submit">New to the site?</Button>
            </div>
        </Form>
        <ErrorModal closeModal={this.closeModal} show={this.state.turnAlert}
                error={this.state.error}></ErrorModal>
        </div>

        </div>
       


      );
    }
  }

  export default LoginScreen;
