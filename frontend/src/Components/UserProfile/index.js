import React from "react";
import "./styles.css";
import "./../universalStyles.css"
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import MainMenuBar from './../MainMenuBar';
import Modal from 'react-modal';
import ReviewsList from './../ReviewsList';
import AddReview from './../AddReview';
import EditProfile from './../EditProfile';
import GenreSelector from '../GenreSelector'
import { getAllReviews, getUser, getUserReviews, getUserImage, readCookie } from './../../services/api'

class UserProfile extends React.Component {
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
      profilePic: null,
      showModalFollowing: false,
      showModalFollows: false,
      showModalAddRev: false,
      reviews: [],
      peopleFollow: [],
      peopleFollowing: [],
      showUpdateProfile: false,
      userDescription: "",
      favoriteGenres: "",
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
    this.updateProfileClick = this.updateProfileClick.bind(this)
    this.handleOpenFollowingModal = this.handleOpenFollowingModal.bind(this);
    this.handleCloseFollowingModal = this.handleCloseFollowingModal.bind(this);
    this.handleOpenFollowersModal = this.handleOpenFollowersModal.bind(this);
    this.handleCloseFollowersModal = this.handleCloseFollowersModal.bind(this);
    this.handleOpenAddRevModal = this.handleOpenAddRevModal.bind(this);
    this.handleCloseAddRevModal = this.handleCloseAddRevModal.bind(this);
    this.handleCloseUpdateProfileModal = this.handleCloseUpdateProfileModal.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  async componentDidMount() {
    await readCookie(this)
    this.renderRedirect()
    const reviews = await getAllReviews();
    const username = this.state.currentUser
    const userData = await getUser(username);
    const userReviewsData = await getUserReviews(username);
    let userReviews = userReviewsData.data;
    const userImg = await getUserImage(username)
    const userFollowersList = userData.data["following"]
    const userFollowingList = userData.data["followers"]
    for (let j =0; j < userReviews.length; j++) {
        userReviews[j]["image_url"] = userImg.data;
    }
    const userFollowers = [];
    const usersFollowing = [];
    for (let j =0; j < userFollowersList.length; j++) {
        const userFollower = {username: userFollowersList[j]}
        const followerUserImg = await getUserImage(userFollowersList[j])
        userFollower["image_url"] = followerUserImg.data;
        userFollowers.push(userFollower)
    }
    for (let j =0; j < userFollowingList.length; j++) {
        const userFollowing = {username: userFollowingList[j]}
        const followingUserImg = await getUserImage(userFollowingList[j])
        userFollowing["image_url"] = followingUserImg.data;
        usersFollowing.push(userFollowing)
    }

    userReviews = userReviews.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      return bDate - aDate
    })
    let favGenText = "";
    const favoriteGenres = userData.data["favoriteGenres"]
    for (const key of Object.keys(favoriteGenres)) {
        if (favoriteGenres[key]) {
          favGenText = favGenText + key +  ", "
        }
    }
    favGenText = favGenText.slice(0,favGenText.length - 2)

    this.setState({
        currentUser: username,
        profilePic: userData.data["image_url"],
        peopleFollow: userFollowers,
        peopleFollowing: usersFollowing,
        userDescription: userData.data["description"],
        reviews: userReviews,
        favoriteGenres: favGenText
      })
    Modal.setAppElement('body');
  }

  updateProfileClick () {
    this.setState({showUpdateProfile: true});
  }

  handleOpenFollowingModal () {
    this.setState({ showModalFollowing: true });
  }

  handleOpenFollowersModal () {
    this.setState({ showModalFollowers: true });
  }

  handleOpenAddRevModal () {
    this.setState({showModalAddRev: true})
  }

  handleCloseFollowingModal () {
    this.setState({ showModalFollowing: false});
  }

  handleCloseFollowersModal () {
    this.setState({showModalFollowers: false});
  }

  handleCloseAddRevModal () {
    this.setState({showModalAddRev: false})
  }

  handleCloseUpdateProfileModal () {
    // window.location.reload(false);
    this.setState({showUpdateProfile: false})
  }

  renderRedirect(){
    if(!this.state.currentUser){
      this.props.history.push("/")
    }
  }

  render() {
    let follow_edit_button;
    let add_review_button;
    follow_edit_button = <Button variant="outline-primary"
                  type="submit"
                  className="editButtonUserProfile"
                  onClick={this.updateProfileClick}
                  >
                  Edit Profile
                </Button>
    add_review_button = <Button variant="outline-primary"
                         type="click"
                         className="addRevButton"
                         onClick={this.handleOpenAddRevModal}>
                         Add Review
                         </Button>

    const userFollowingList = this.state.peopleFollow.map((person, index) =>
      // expression goes here:
      <div key={index} className="followUserText">
          <img className="followUserPic" src={person.image_url}/>
          <Link className="followInfoLink" to={{pathname:'/ProfileView/' + person.username}}>
          {person.username}
          </Link>
      </div>
    );

    const userFollowersList = this.state.peopleFollowing.map((person, index) =>
      // expression goes here:
      <div key={index} className="followUserText">
          <img className="followUserPic" src={person.image_url}/>
          <Link className="followInfoLink" to={{pathname:'/ProfileView/' + person.username}}>
          {person.username}
          </Link>
      </div>
    );

    const username = this.state.currentUser;

    return (
      <div id="userProfile">
          <MainMenuBar username={username} />
          <div id="bodyHeader">
            <div id="profilePicContainer">
              <img className="profilePic" src={this.state.profilePic} />
            </div>
            <div id="profileInfo">
              <div id="infoHeader">
                <span id="userName">{username}</span>
                {follow_edit_button}

                {add_review_button}
                <GenreSelector signup={this}></GenreSelector>
                <Modal className = "addRevModal"
                 overlayClassName="Overlay"
                 isOpen={this.state.showModalAddRev}
                 contentLabel="Minimal Modal Example"
                 >
                 <AddReview queueComponent={this} cancelFunction={this.handleCloseAddRevModal} profImg={this.state.profilePic}
                            authenticateduser={username}
                 />
                </Modal>

                <Modal className = "updateProfile"
                 overlayClassName="Overlay"
                 isOpen={this.state.showUpdateProfile}
                 contentLabel="Minimal Modal Example"
                 onRequestClose={this.handleCloseUpdateProfileModal}>
                   <EditProfile queueComponent={this} cancelFunction={this.handleCloseUpdateProfileModal} />
                </Modal>
                <Modal className = "numFollowModel"
                 overlayClassName="Overlay"
                 isOpen={this.state.showModalFollowing}
                 contentLabel="Minimal Modal Example"
                 onRequestClose={this.handleCloseFollowingModal}
                 >
                 <div className = "followModelHeader">
                  Following
                 </div>
                 <div className = "followModelBody">
                 {userFollowingList}
                  </div>
               </Modal>
               <Modal className = "numFollowModel"
                overlayClassName="Overlay"
                isOpen={this.state.showModalFollowers}
                contentLabel="Minimal Modal Example"
                onRequestClose={this.handleCloseFollowersModal}
                >
                <div className = "followModelHeader">
                 Follows
                </div>
                <div className = "followModelBody">
                {userFollowersList}
                 </div>
              </Modal>
              </div>
              <div id="infoStats">
                <span id="totalReviews"> {this.state.reviews.length} </span>Reviews
                <span id="totalFollowers" onClick={this.handleOpenFollowersModal}>{this.state.peopleFollowing.length} Followers</span>
                <span id="totalFollowing" onClick={this.handleOpenFollowingModal}>{this.state.peopleFollow.length} Following</span>
              </div>
              <div>
              <br/>
              Favourite Genres : {this.state.favoriteGenres}
              </div>
              <div id="userDescription">
                {this.state.userDescription}
              </div>
            </div>
          </div>
          <div className="profileFeed">
            <ReviewsList reviews={this.state.reviews}
                         queueComponent={this}
                         authenticateduser= {username}/>
          </div>
      </div>
    );
  }
}


export default UserProfile;
