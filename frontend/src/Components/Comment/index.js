import React from "react";
import {Link} from 'react-router-dom';
import "./styles.css";

// Class for a Comment Feed Component
class Comment extends React.Component {

  render() {

    const { date, content, username, authenticateduser } = this.props

    let profile_url = '';
    if (username === authenticateduser) {
      profile_url = '/UserProfile/'
    }
    else {
      profile_url = '/ProfileView/' + username
    }

    return (
      <div id="comment">
        <span>{ date } </span><span>| <b><i>
        <Link id="link" to={{pathname:profile_url, state: { username: authenticateduser, profileUser: username }}}>
        {username} :
        </Link>
        </i></b></span><span> { content } </span>
      </div>
    );
  }
}

export default Comment;
