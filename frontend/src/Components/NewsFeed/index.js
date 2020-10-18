// import all react libraries
import React from "react";
// import all stylesheets
import "./styles.css";
import "./../universalStyles.css"
// import all needed Components
import MainMenuBar from './../MainMenuBar';
import ReviewsList from './../ReviewsList';
import SearchBar from "../SearchBar";
import GenreSearchBar from '../GenreSearchBar';
// import functions/api calls for backend and database requets to server
import { getUserReviews,getFriendsOfUser,getUserImage,readCookie } from './../../services/api'

// Class for the Reviews News Feed Component
class NewsFeedScreen extends React.Component {

  // Constructor function that stores the react STATE variable that holds dynamically changing data. Constructor
  // used to bind the used methods to this class.
  constructor(props) {
    super(props);
    readCookie(this)
    this.state = {reviews: []};
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  async componentDidMount() {
    // get all the reviews of the friends of the current user to display them in the NewsFeed
    await readCookie(this)
    this.renderRedirect()
    const authenticateduser = this.state.currentUser
    const currUserFriendsTemp = await getFriendsOfUser(authenticateduser)
    const currUserFriends = currUserFriendsTemp.data
    let myNewsFeed = []
    for(let i=0; i<currUserFriends.length; i++) {
      const currFriendReviews = await getUserReviews(currUserFriends[i])
      const newReviews = currFriendReviews.data
      const userImg = await getUserImage(currUserFriends[i])
      for (let j =0; j < newReviews.length; j++) {
          newReviews[j]["image_url"] = userImg.data;
      }
      myNewsFeed = myNewsFeed.concat(newReviews);
    }
    // sort all the reviews from the curr users friends in order of latest to oldest
    myNewsFeed = myNewsFeed.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      return bDate - aDate
    })
    // set the state property "reviews" to equal to the array of reviews from curr users friends
    this.setState({reviews: myNewsFeed})
  }

  renderRedirect(){
    if(!this.state.currentUser){
      this.props.history.push("/")
    }
  }

  render() {
    const authenticateduser = this.state.currentUser;
    return (
      <div id="pageFeed">

        {/*The menu bar is just reused from the Component MainMenuBar */}
        <MainMenuBar username={authenticateduser}/>

        {/*Form that takes in the input of users to search movies and reviews of movies */}
        <div id="searchMovieform">
          <SearchBar history={this.props.history}/>
        </div>
        <div id="searchGenreform">
          <GenreSearchBar history={this.props.history}/>
        </div>

        {/*Title of the review news feed page */}
        <div id="pageHeaderNF">
         <h3 id="headerTextNF">My Reviews Feed</h3>
        </div>

        {/* Reviews List here to display all reviews from friends of current user */}
        <ReviewsList reviews={this.state.reviews}
                     queueComponent={this}
                     authenticateduser= {authenticateduser}/>

      </div>
    );
  }
}

export default NewsFeedScreen;
