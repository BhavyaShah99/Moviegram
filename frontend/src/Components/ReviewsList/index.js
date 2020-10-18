// import all react libraries
import React from "react";
import { uid } from "react-uid";
// import all stylesheets
import "./styles.css";
import "./../universalStyles.css";
// import all needed Components
import Review from './../Review';
import ReviewGeneric from './../ReviewGeneric';
import ReviewAdmin from './../ReviewAdmin';



// Class for a Review Component
class ReviewsList extends React.Component {

  render() {

    const { reviews, type, authenticateduser, queueComponent} = this.props;
    if(reviews.length !== 0) {
      if (type==="generic"){
        return (
          <div className="revs">
            {reviews.map((review) => (
              <ReviewGeneric key={uid(review)}
                      admin={review.admin}
                      reviewId={review._id}
                      authenticateduser= {authenticateduser}
                      datetime={review.date}
                      username={review.username}
                      userImg={review.image_url}
                      movieName={review.movie_title}
                      movieId={review.movie_id}
                      reviewContent={review.content}
                      spoiler={review.spoilers}
                      comments={review.comments}
                      queueComponent={queueComponent}/>
            ))}
          </div>
        );
      } else if (type==="admin"){
        return (
          <div className="revs">
            {reviews.map((review) => (
              <ReviewAdmin key={uid(review)}
                      admin={review.admin}
                      reviewId={review._id}
                      authenticateduser= {authenticateduser}
                      datetime={review.date}
                      username={review.username}
                      userImg={review.image_url}
                      movieName={review.movie_title}
                      movieId={review.movie_id}
                      reviewContent={review.content}
                      spoiler={review.spoilers}
                      comments={review.comments}
                      queueComponent={queueComponent}/>
            ))}
          </div>
        );
      }
      else {
        return (
          <div className="revs">
            {reviews.map((review) => (
              <Review key={uid(review)}
                      admin={review.admin}
                      reviewId={review._id}
                      authenticateduser= {authenticateduser}
                      datetime={review.date}
                      username={review.username}
                      userImg={review.image_url}
                      movieName={review.movie_title}
                      movieId={review.movie_id}
                      reviewContent={review.content}
                      spoiler={review.spoilers}
                      comments={review.comments}
                      queueComponent={queueComponent}/>
            ))}
          </div>
        );
      }
    } else {
      return (
        <div className="norevs">
          <h4>User Has No Reviews</h4>
        </div>
      )
    }
  }
}

export default ReviewsList;
