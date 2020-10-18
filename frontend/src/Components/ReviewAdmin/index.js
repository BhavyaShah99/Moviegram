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
import {getUpvoters,getDownvoters,removeReview}  from './../../services/api'

class AdminReview extends React.Component {

  // Constructor function that stores the react STATE variable that holds dynamically changing data. Constructor
  // used to bind the implemented methods to this class that need to access variables of defined inside the constructor.
  constructor(props) {
    super(props)
    this.state = { newComment: "", upvotes: 0, downvotes: 0, comments: [], showCommentsModal: false};
    this.remove_Review = this.remove_Review.bind(this)
    // this.incrementUpvote = this.incrementUpvote.bind(this)
    // this.incrementDownvote = this.incrementDownvote.bind(this)
    this.hasSpoiler = this.hasSpoiler.bind(this)
    this.handleOpenCommentsModal = this.handleOpenCommentsModal.bind(this);
    this.handleCloseCommentsModal = this.handleCloseCommentsModal.bind(this);
  }

  async componentDidMount() {
    let upvotes = await getUpvoters(this.props.reviewId)
    let downvotes = await getDownvoters(this.props.reviewId)
    upvotes = upvotes.data.length
    downvotes = downvotes.data.length
    this.setState({upvotes: upvotes})
    this.setState({downvotes: downvotes})
  }

  async remove_Review(username, movie) {
    await removeReview(username, movie)
    window.location.reload(false);
  }

  hasSpoiler(spoilerVal) {
    if (spoilerVal === true) {
      return (
        <span id="spoilerTagRA">Spoilers !!!!</span>
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
    const { reviewId, authenticateduser, datetime, username, userImg,
            movieName, reviewContent, spoiler, comments, queueComponent} = this.props;

    if (username === authenticateduser) {
      profile_url = '/UserProfile/'
    }
    else {
      profile_url = '/ProfileView/' + username
    }

    add_comment_button = <Button variant="secondary"
                         type="click"
                         onClick={this.handleOpenCommentsModal}>
                         See Comments ({comments.length})
                         </Button>

    return(
      <div id="reviews">

        {/* the unordered list that displays the user profile img, username of author and movie for a specific review */}
        <ul>
          <li><span className="reviewUserPicLi">
            <Link to={{pathname:profile_url}}>
            <img className="reviewUserPic" src={userImg} alt="User DP"/>
            </Link>
            </span>{username}
          </li>
          <li>
            {this.hasSpoiler(spoiler)}
          </li>
          <li>{movieName}</li>
          <li><Button variant="primary" onClick={() => this.remove_Review(username, movieName)}>
          Remove Review</Button></li>
        </ul>

        {/* Content of the review and the datetime on which it was posted are displayed in the following elements */}
        <span id="contentsRA">{reviewContent}</span>
        <span id="datetimes">Posted on : {datetime}</span>

        {/* The comments section for each review is displayed below */}
        <div id="commentsRA">
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
        <div id="votes">
          <Button id="vote-up" variant="primary">Upvote ({this.state.upvotes})</Button>
          <Button id="vote-down" variant="primary">Downvote ({this.state.downvotes})</Button>
        </div>

      </div>
    )

  }
}

export default AdminReview;
