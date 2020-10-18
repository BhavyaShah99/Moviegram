import React from 'react';
import './styles.css'
import "./../universalStyles.css"
import { Button} from "react-bootstrap";
import MainMenuBar from './../MainMenuBar';
import AddMovie from './../AddMovie';
import ReviewsList from './../ReviewsList';
import Modal from 'react-modal';

import { getAllReviews, readCookie, getUserImage } from './../../services/api';


class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state = {searched: "",
                  showModalAddMovie: false,
                  reviews: []
                 };
    this.handleOpenAddMovieModal = this.handleOpenAddMovieModal.bind(this);
    this.handleCloseAddMovieModal = this.handleCloseAddMovieModal.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this)

  }

  async componentDidMount() {
    await readCookie(this)
    this.renderRedirect()

    let allReviews = await getAllReviews()
    allReviews = allReviews.data
    // sort all the reviews from the curr users friends in order of latest to oldest
    for(let i=0; i<allReviews.length; i++) {
      const userImg = await getUserImage(allReviews[i].username)
      allReviews[i]["image_url"] = userImg.data;
    }
    allReviews = allReviews.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      return bDate - aDate
    })
    this.setState({reviews: allReviews})
  }

  handleOpenAddMovieModal () {
    this.setState({showModalAddMovie: true})
  }

  handleCloseAddMovieModal () {
    this.setState({showModalAddMovie: false})
  }
  renderRedirect(){
    if(!this.state.currentUser || this.state.currentUser != "admin"){
      this.props.history.push("/")
    }
  }

  render() {
    const username = this.state.currentUser;

    return (
      <div className="AdminFeed">

        <MainMenuBar username={username}></MainMenuBar>

        <div id="pagesHeader">
         <h3 id="headersText">Admin Dashboard</h3>
        </div>
        <div id="AddMovieButton">
        <Button variant="primary"
                 type="click"
                 onClick={this.handleOpenAddMovieModal}>
                 Add Movie
        </Button>
        </div>
        <div className="spaceBox">

        </div>
        <div id="Revs">
        <ReviewsList reviews={this.state.reviews}
                     type = "admin"
                     queueComponent={this}
                     authenticateduser= {username}/>
        </div>


         <Modal className = "addMovieModal"
          overlayClassName="Overlay"
          isOpen={this.state.showModalAddMovie}
          contentLabel="Minimal Modal Example"
          >
          <AddMovie cancelFunction={this.handleCloseAddMovieModal} />
         </Modal>
      </div>

    )
  }
}

export default Admin;
