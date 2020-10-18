import React from "react";
import "./styles.css";
import "./../universalStyles.css"
import { Button, Form } from "react-bootstrap";
import { uid } from "react-uid";
import ErrorModal from './../ErrorModal';
import Comment from './../Comment';
import { addComment,getReview } from './../../services/api'

class CommentsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { comments: [],
                   turnAlert: false,
                   newComment: ""};
    this.saveComment = this.saveComment.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.formOrNot = this.formOrNot.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  async componentDidMount() {
    let review = await getReview(this.props.reviewId)
    review = review.data
    this.setState({comments: review.comments})
  }

  closeModal() {
   this.setState({turnAlert: false})
  }

  async saveComment(reviewId, closeFunc, authenticateduser, queue) {
    if (this.state.newComment.trim() === "") {
      this.setState({error: "Cannot post an empty comment."})
      this.setState({turnAlert: true})
    } else {
        const addedComment = {username: authenticateduser, date: new Date().toLocaleString(), content: this.state.newComment}
        const commentAdded = await addComment(addedComment, reviewId)
        queue.state.commentsSize = queue.state.commentsSize + 1
        let existingComs = this.state.comments
        existingComs.push(addedComment)
        this.setState({comments: existingComs})
        this.commentForm.reset()
        this.setState({newComment: ""})
    }
  }

  handleCommentChange(event) {
    this.setState({newComment:event.target.value.trim()})
  }

  formOrNot(generic, reviewId, cancelFunction, authenticateduser, queue) {
    if (generic === false) {
      return (
        <Form id="new-Com" ref={commentForm => this.commentForm = commentForm}>
          <Form.Row>
            <Form.Group id="write-It">
              <Form.Control type="newComment" placeholder="Write a Comment" id="comBar" onChange={this.handleCommentChange}/>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" onClick={() => this.saveComment(reviewId, cancelFunction, authenticateduser, queue)}>
              Post Comment
              </Button>
              <Button variant="primary" id="comButtonCancel" onClick={cancelFunction} type="submit">Close</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      )
    } else {
      return (<Button variant="primary" id="comButtonCancel" onClick={cancelFunction} type="submit">Cancel</Button>)
    }
  }

  render() {

    const { queueComponent, reviewId, cancelFunction, authenticateduser, generic } = this.props

    return (
      <div id="commentsSection">

         <div id="comments-modal">

            <div id="comments-mapped">
              <h5 id="comModalHeader"><b><u>Comments:</u></b></h5>
              {this.state.comments.map((com) => (<Comment key={uid(com)}
                                                          date={com.date}
                                                          username={com.username}
                                                          content={com.content}
                                                          authenticateduser={authenticateduser}/>))}
            </div>
            <div>
              {this.formOrNot(generic, reviewId, cancelFunction, authenticateduser, queueComponent)}
            </div>
            <ErrorModal closeModal={this.closeModal} show={this.state.turnAlert} error={this.state.error}></ErrorModal>

        </div>

      </div>
    );
  }
}

export default CommentsModal;
