
import React from 'react';
import './styles.css';
import MainMenuBar from './../MainMenuBar';
import {getMovie, readCookie, isUpvoted, addMovieDownvoter, addMovieUpvoter, getReviewsByMovieID, getUserImage} from '../../services/api'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import IconButton from '@material-ui/core/IconButton';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ReviewsList from '../ReviewsList'

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.upVote = this.upVote.bind(this)
        this.downVote = this.downVote.bind(this)

    }
    state = {
        data: {title: "", imgsrc: "", director: "", genres: [], stars: []},
        thumbUp: false,
        thumbDown: false,
        reviews: []
    }
    async componentDidMount() {
        await readCookie(this);
        const movie_id = this.props.match.params.param1
        const res = await getMovie(movie_id)
        const reviewsData = await getReviewsByMovieID(movie_id)
        const reviews = reviewsData.data;
        for (let j =0; j < reviews.length; j++) {
            const userImg = await getUserImage(reviews[j].username)
            reviews[j]["image_url"] = userImg.data;
        }
        this.setState({reviews: reviews})

        if(this.state.currentUser){
            const res2 = await isUpvoted(movie_id, this.state.currentUser)
            if(res2){
                if(res2.data.thumbDown){
                    this.setState({thumbDown: true})
                }
                if(res2.data.thumbUp){
                    this.setState({thumbUp: true})
                }
            }
        }
        if(!res){
            // if(this.state.username){
            //     this.props.history.push({pathname: "/Newsfeed"})
            // }else{
            //     this.props.history.push({pathname: "/"})
            // }

        } else{
            this.setState({data: res.data});
        }
    }

    makeGenresString(genres_object){
        const genres = Object.keys(genres_object).filter((val) => genres_object[val])
        if(genres === []){
            return "None"
        }
        let string = genres[0]
        for(let i = 1; i < genres.length; i++){
            string += `, ${genres[i]}`
        }
        return string
    }

    async upVote(){
        const movie_id = this.state.data._id
        const user_id = this.state.currentUser

        const upvoteAdded = await addMovieUpvoter(movie_id, user_id)
        if(upvoteAdded !== null){
            this.setState({thumbUp: true})
            this.setState({thumbDown: false})
            const data = {...this.state.data}
            data.upvotes += 1
            if(data.downvotes !== 0){
                data.downvotes -= 1
            }
            this.setState({data: data})

        }
    }

    async downVote(){
        const movie_id = this.state.data._id
        const user_id = this.state.currentUser

        const downvoteAdded = await addMovieDownvoter(movie_id, user_id)
        if(downvoteAdded !== null){
            this.setState({thumbDown: true})
            this.setState({thumbUp: false})
            const data = {...this.state.data}
            if(data.upvotes !== 0){
                data.upvotes -= 1
            }
            data.downvotes += 1

            this.setState({data: data})


        }
    }

    render() {
        if(this.state.data.title === ""){
            return(<div>
                <MainMenuBar username={this.state.currentUser}/>
                <div>
                    <h1>
                    404 Movie Not Found
                    </h1>
                </div>
            </div>);
        }
        let thumbs;
        if(this.state.currentUser){
            thumbs = <CardContent id="thumbs">
                        <IconButton
                         onClick={() => this.downVote()}
                         disabled={this.state.thumbDown}>
                            <ThumbDownIcon  fontSize="large"/>
                        </IconButton>
                        <IconButton
                        onClick={() => this.upVote()}
                        disabled={this.state.thumbUp} >
                            <ThumbUpIcon fontSize="large"  />
                        </IconButton>
                    </CardContent>
        }

        let reviews;
        if(this.state.reviews !== []){
            reviews = <ReviewsList reviews={this.state.reviews}
            type={"generic"}
            queueComponent={this}
            authenticateduser= {this.state.currentUser}/>
        }

        let rating;
        if(this.state.data.upvotes === 0 && this.state.data.downvotes === 0){
            rating = "N/A"
        } else{
            const up = this.state.data.upvotes
            const down = this.state.data.downvotes

            rating = Math.round((up)/(up + down)*100) + "%"
        }
        return(
        <div id="bigMovieContainer">
            <MainMenuBar username={this.state.currentUser}/>

            <div id="movieContent">
                <Card id="movieContainer">
                    <CardContent id="imgContainer">
                            <img src={this.state.data.imgsrc}
                            className="movieImage"
                            alt=""></img>
                    </CardContent>
                    <CardContent id="movieDetails">
                            <CardContent>
                            <Typography align="center" gutterBottom variant="h3" component="h1">
                                {this.state.data.title}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="p">
                                Genres: {this.makeGenresString(this.state.data.genres)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.data.description}
                            </Typography>
                            </CardContent>
                            <CardContent>
                                     <Typography align="center" variant="h4">
                                            Directed by: {this.state.data.director}
                                        </Typography>
                                        <Typography align="center" variant="h4">
                                             Audience Rating: {rating}
                                        </Typography>
                            </CardContent>
                            <CardContent align="center">
                                        <Typography align="center" variant="h4">
                                            Starring
                                        </Typography>
                                        <CardContent id="stars">
                                        {
                                            this.state.data.stars.map((obj) =>
                        {return(<Typography key={obj} gutterBottom variant="h6">
                                                {obj}
                                            </Typography>
                                            );})
                                        }
                                        </CardContent>
                            </CardContent>
                            {thumbs}
                    </CardContent>
                </Card>

            </div>
            <div>
            {reviews}

            </div>

        </div>
        );
    }
}

export default Movie;
