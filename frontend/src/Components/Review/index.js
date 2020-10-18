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
import {getUpvoters,getDownvoters,addDownvoter,addUpvoter}  from './../../services/api'

// Class for a Review Component
class Review extends React.Component {

  // Constructor function that stores the react STATE variable that holds dynamically changing data. Constructor
  // used to bind the implemented methods to this class that need to access variables of defined inside the constructor.
  constructor(props) {
    super(props)
    this.state = { upvotes: 0, downvotes: 0, showCommentsModal: false, commentsSize: 0};
    this.incrementUpvote = this.incrementUpvote.bind(this)
    this.incrementDownvote = this.incrementDownvote.bind(this)
    this.handleOpenCommentsModal = this.handleOpenCommentsModal.bind(this);
    this.handleCloseCommentsModal = this.handleCloseCommentsModal.bind(this);
    this.hasSpoiler = this.hasSpoiler.bind(this)
  }

  async componentDidMount() {
    let upvotes = await getUpvoters(this.props.reviewId)
    let downvotes = await getDownvoters(this.props.reviewId)
    upvotes = upvotes.data.length
    downvotes = downvotes.data.length
    this.setState({upvotes: upvotes})
    this.setState({downvotes: downvotes})
    this.setState({commentsSize: this.props.comments.length})
  }

  // increase the number upvotes the review has by 1
  async incrementUpvote(reviewId, authenticateduser) {
    const upvoteAdded = await addUpvoter(reviewId, authenticateduser)
    if (upvoteAdded !== null) {
      let upvotes = await getUpvoters(this.props.reviewId)
      let downvotes = await getDownvoters(this.props.reviewId)
      upvotes = upvotes.data.length
      downvotes = downvotes.data.length
      this.setState({upvotes: upvotes})
      this.setState({downvotes: downvotes})
    }
  }

  // increase the number downvotes the review has by 1
  async incrementDownvote(reviewId, authenticateduser) {
    const downvoteAdded = await addDownvoter(reviewId, authenticateduser)
    if (downvoteAdded !== null) {
      let upvotes = await getUpvoters(this.props.reviewId)
      let downvotes = await getDownvoters(this.props.reviewId)
      upvotes = upvotes.data.length
      downvotes = downvotes.data.length
      this.setState({upvotes: upvotes})
      this.setState({downvotes: downvotes})
    }
  }

  hasSpoiler(spoilerVal) {
    if (spoilerVal === true) {
      return (
        <span id="spoilerTagR">Spoilers !!!!</span>
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
    const { authenticateduser, reviewId, datetime, username,
            userImg, movieName, movieId, reviewContent, spoiler, comments, queueComponent} = this.props;

    if (username === authenticateduser) {
      profile_url = '/UserProfile/'
    }
    else {
      profile_url = '/ProfileView/' + username
    }

    add_comment_button = <Button variant="secondary"
                         type="click"
                         onClick={this.handleOpenCommentsModal}>
                         See Comments ({this.state.commentsSize})
                         </Button>

    return (
      <div id="review">

        {/* the unordered list that displays the user profile img, username of author and movie for a specific review */}
        <ul>
          <li><span>
          <Link to={{pathname:profile_url}}>
          <img className="reviewUserPic" src={userImg} alt="User DP"/>
          </Link>
          </span>
          {username}
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
        <span id="contentR">{reviewContent}</span>
        <span id="datetimeR">Posted on : {datetime}</span>

        {/* The comments section for each review is displayed below */}
        <div id="commentsR">
          <h6><b><u>Comments:</u></b></h6>
          <span>{add_comment_button}</span>
        </div>
        <Modal
         overlayClassName="Overlay"
         isOpen={this.state.showCommentsModal}
         contentLabel="Minimal Modal Example"
         >
         <CommentsModal queueComponent={this} reviewId={reviewId} cancelFunction={this.handleCloseCommentsModal}
                        authenticateduser={authenticateduser} generic={false}/>
        </Modal>

        {/* used to upvote or downvote a review */}
        <div>
          <Button id="votes-upR" variant="primary" onClick={() => this.incrementUpvote(reviewId, authenticateduser)}>Upvote ({this.state.upvotes})</Button>
          <Button id="votes-downR" variant="primary" onClick={() => this.incrementDownvote(reviewId, authenticateduser)}>Downvote ({this.state.downvotes})</Button>
        </div>

      </div>
    );
  }
}

export default Review;
