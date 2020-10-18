import React from "react";
import "./styles.css";
import "./../universalStyles.css"
import { Button } from "react-bootstrap";
import MainMenuBar from './../MainMenuBar';
import bhavyaPic from './bhavya.jpg'
import messi_dp from './../UserProfile/messi_dp.jpg'
import Modal from 'react-modal';
import ReviewsList from './../ReviewsList';
import AddReview from './../AddReview';
import EditProfile from './../EditProfile';
import {Link} from 'react-router-dom';

import {
  getAllReviews,
  getUser,
  getUserReviews,
  updateUserFollowInfo,
  getUserImage,
  readCookie
} from './../../services/api'

class ProfileView extends React.Component {
  constructor(props) {
    // When the componenet is created
    super(props);
    this.state = {
      followUnfollowText: "",
      username: "",
      profilePic: null,
      showModalFollowing: false,
      showModalFollows: false,
      reviews: [],
      peopleFollow: [],
      peopleFollowing: [],
      showUpdateProfile: false,
      userDescription: "",
      favoriteGenres: ""
    };
    this.handleOpenFollowingModal = this.handleOpenFollowingModal.bind(this);
    this.handleCloseFollowingModal = this.handleCloseFollowingModal.bind(this);
    this.handleOpenFollowersModal = this.handleOpenFollowersModal.bind(this);
    this.handleCloseFollowersModal = this.handleCloseFollowersModal.bind(this);
    this.followUser = this.followUser.bind(this);
  }

  async componentDidMount() {
    await readCookie(this)
    const profileUsername = this.props.match.params.id
    const authenticatedUsername = this.state.currentUser;
    const profileUserData = await getUser(profileUsername);
    if (profileUserData.data == "") {
          this.setState({username: ""})
    }
    else {
    const profileUserReviews = await getUserReviews(profileUsername);
    const authUserData = await getUser(authenticatedUsername);
    const authUserFollowing = authUserData.data["following"]
    let followUnfollowText = ""
    if (authUserFollowing.includes(profileUsername)) {
      followUnfollowText = "UnFollow";
    }
    else {
      followUnfollowText = "Follow";
    }
    const reviews = profileUserReviews.data;
    const image_url = profileUserData.data["image_url"]
    for(let i=0; i<reviews.length; i++) {
      reviews[i]["image_url"] = image_url;
    }
    const userFollowersList = profileUserData.data["following"]
    const userFollowingList = profileUserData.data["followers"]
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

    let favGenText = "";
    const favoriteGenres = profileUserData.data["favoriteGenres"]
    for (const key of Object.keys(favoriteGenres)) {
        if (favoriteGenres[key]) {
          favGenText = favGenText + key +  ", "
        }
    }
    favGenText = favGenText.slice(0,favGenText.length - 2)
    this.setState({
        username: profileUsername,
        profilePic: image_url,
        peopleFollow: userFollowers,
        peopleFollowing: usersFollowing,
        userDescription: profileUserData.data["description"],
        reviews: profileUserReviews.data,
        followUnfollowText: followUnfollowText,
        favoriteGenres: favGenText
      })
    }
    Modal.setAppElement('body');
  }


  handleOpenFollowingModal () {
    this.setState({ showModalFollowing: true });
  }

  handleOpenFollowersModal () {
    this.setState({ showModalFollowers: true });
  }

  handleCloseFollowingModal () {
    this.setState({ showModalFollowing: false});
  }

  handleCloseFollowersModal () {
    this.setState({showModalFollowers: false});
  }

  async followUser(event,authenticateduser, profileUser) {

    const profileUserData = await getUser(profileUser);
    const authUserData = await getUser(authenticateduser);

    if (this.state.followUnfollowText === "Follow" && !(profileUserData.data.followers.includes(authenticateduser))) {
      const profileFollowers = profileUserData.data.followers
      profileFollowers.push(authenticateduser)
      updateUserFollowInfo({
        username: profileUser,
        isFollowers: true,
        followers: profileFollowers})
      const authUserFollowing = authUserData.data.following
      authUserFollowing.push(profileUser)
      updateUserFollowInfo({
        username: authenticateduser,
        isFollowers: false,
        followers: authUserFollowing})
      const profileUserPic = profileUserData.data.image_url
      this.state.peopleFollowing.push({username: authenticateduser, image_url: profileUserPic})
      this.setState({followUnfollowText: "UnFollow"})
    }
    else if (this.state.followUnfollowText === "UnFollow") {
      const profileFollowers = profileUserData.data.followers
      const authUserIndex = profileFollowers.indexOf(authenticateduser);
      profileFollowers.splice(authUserIndex,1)
      updateUserFollowInfo({
        username: profileUser,
        isFollowers: true,
        followers: profileFollowers})
      const authUserFollowing = authUserData.data.following
      const profileUserIndex = authUserFollowing.indexOf(profileUser);
      authUserFollowing.splice(profileUserIndex,1)
      updateUserFollowInfo({
        username: authenticateduser,
        isFollowers: false,
        followers: authUserFollowing})

      const newFollowers =  this.state.peopleFollowing.filter(function(user) {
        	return user.username != authenticateduser;
      });
      this.setState({followUnfollowText: "Follow", peopleFollowing: newFollowers})
    }
  }

  render() {

    if (this.state.username === "") {
      return(<div>
          <MainMenuBar username={this.state.currentUser}/>
          <div>
              <h1>
              404 User Not Found
              </h1>
          </div>
      </div>);
    }
    let follow_edit_button;
    let add_review_button;
    const authenticatedusername = this.state.currentUser;
    const profileUser = this.props.match.params.id

    follow_edit_button = <Button variant="outline-primary"
                  type="submit"
                  className="editButton"
                  onClick={(e) => this.followUser(e,authenticatedusername,profileUser)}
                  >
                  {this.state.followUnfollowText}
                </Button>

    const userFollowingList = this.state.peopleFollow.map((person, index) =>
      // expression goes here:
      <div key={index} className="followUserText">
          <img className="followUserPic" src={person.image_url} alt="User DP"/>
          <Link className="followInfoLink" to={{pathname:'/ProfileView/' + person.username, state: { username: this.state.username, profileUser: person.username }}}>
          {person.username}
          </Link>
      </div>
    );

    const userFollowersList = this.state.peopleFollowing.map((person, index) =>
      // expression goes here:
      <div key={index} className="followUserText">
          <img className="followUserPic" src={person.image_url} alt="User DP"/>
          <Link className="followInfoLink" to={{pathname:'/ProfileView/' + person.username, state: { username: this.state.username, profileUser: person.username }}}>
          {person.username}
          </Link>
      </div>
    );

    return (
      <div id="userProfile">
          <MainMenuBar username={authenticatedusername}/>
          <div id="bodyHeader">
            <div id="profilePicContainer">
              <img className="profilePic" src={this.state.profilePic} />
            </div>
            <div id="profileInfo">
              <div id="infoHeader">
                <span id="userName">{profileUser}</span>
                {follow_edit_button}

                <Modal className = "addRevModal"
                 overlayClassName="Overlay"
                 isOpen={this.state.showModalAddRev}
                 contentLabel="Minimal Modal Example"
                 >
                 <AddReview queueComponent={this} cancelFunction={this.handleCloseAddRevModal} profImg={this.state.profilePic}/>
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
                         authenticateduser= {authenticatedusername}/>
          </div>
      </div>
    );
  }
}


export default ProfileView;
