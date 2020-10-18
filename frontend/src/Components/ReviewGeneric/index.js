// import all react libraries
import React from "react";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
// import all stylesheets
import "./styles.css";
import "./../universalStyles.css";
// import needed components
import CommentsModal from './../CommentsModal';
// backend db server api funcs
import { getUpvoters,getDownvoters,getReview }  from './../../services/api'



// Class for a Review Component
class ReviewGeneric extends React.Component {

  // Constructor function that stores the react STATE variable that holds dynamically changing data. Constructor
  // used to bind the implemented methods to this class that need to access variables of defined inside the constructor.
  constructor(props) {
    super(props)
    this.state = { upvotes: 0, downvotes: 0, showCommentsModal: false};
    this.userImageType = this.userImageType.bind(this)
    this.hasSpoiler = this.hasSpoiler.bind(this)
    this.handleOpenCommentsModal = this.handleOpenCommentsModal.bind(this);
    this.handleCloseCommentsModal = this.handleCloseCommentsModal.bind(this);
  }

  async componentDidMount() {
    let review = await getReview(this.props.reviewId)
    review = review.data
    this.setState({comments: review.comments})
    let upvotes = await getUpvoters(this.props.reviewId)
    let downvotes = await getDownvoters(this.props.reviewId)
    upvotes = upvotes.data.length
    downvotes = downvotes.data.length
    this.setState({upvotes: upvotes})
    this.setState({downvotes: downvotes})
  }

  userImageType(authenticateduser, userImg, profile_url, username) {
    if (authenticateduser==null) {
      return (<span><img className="reviewUserPic" src={userImg} alt="User DP"/></span>);
    } else if (authenticateduser != null) {
      return (
        <Link to={{pathname:profile_url, state: { currentUser: authenticateduser, profileUser: username }}}>
        <span><img className="reviewUserPic" src={userImg} alt="User DP"/></span>
        </Link>
      )
    }
  }

  hasSpoiler(spoilerVal) {
    if (spoilerVal === true) {
      return (
        <span id="spoilerTagRG">Spoilers !!!!</span>
      )
    } else {
      return (
        <span>             </span>
      )
    }
  }

  handleOpenCommentsModal () {
    this.setState({showCommentsModal: true})
  }

  handleCloseCommentsModal () {
    this.setState({showCommentsModal: false})
  }

  render() {

    let profile_url = '';
    let add_comment_button;
    const { reviewId, authenticateduser, datetime, username,
            userImg, movieName, movieId, reviewContent, spoiler, comments, queueComponent} = this.props;

    if (username === authenticateduser) {
      profile_url = '/UserProfile/'
    }
    else {
      profile_url = '/ProfileView/' + username
    }

    add_comment_button = <Button variant="secondary"
                         type="click"
                         id="commentsButton"
                         onClick={this.handleOpenCommentsModal}>
                         See Comments ({comments.length})
                         </Button>

    return (
      <div id="review">

        {/* the unordered list that displays the user profile img, username of author and movie for a specific review */}
        <ul>
          <li>
            {this.userImageType(authenticateduser, userImg, profile_url, username)}{username}
          </li>
          <li>
            {this.hasSpoiler(spoiler)}
          </li>
          <li>
            <Link id="link" to={{pathname: "/movie/" + movieId, state: { currentUser: authenticateduser }}}>
              {movieName}
            </Link>
          </li>
        </ul>

        {/* Content of the review and the datetime on which it was posted are displayed in the following elements */}
        <span id="contentRG">{reviewContent}</span>
        <span id="datetimeRG">Posted on : {datetime}</span>

        {/* The comments section for each review is displayed below */}
        <div id="commentsRG">
          <h6><b><u>Comments:</u></b></h6>
          <span>{add_comment_button}</span>
        </div>
        <Modal
         overlayClassName="Overlay"
         isOpen={this.state.showCommentsModal}
         contentLabel="Minimal Modal Example"
         >
         <CommentsModal queueComponent={this} reviewId={reviewId} cancelFunction={this.handleCloseCommentsModal}
                        authenticateduser={authenticateduser} generic={true}/>
        </Modal>

        {/* used to upvote or downvote a review */}
        <div>
          <Button id="votes-upRG" variant="primary">Upvotes ({this.state.upvotes})</Button>
          <Button id="votes-downRG" variant="primary">Downvotes ({this.state.downvotes})</Button>
        </div>

      </div>
    )


  }
}

export default ReviewGeneric;
