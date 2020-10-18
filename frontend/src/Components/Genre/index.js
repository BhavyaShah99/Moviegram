
import React from 'react';
import './styles.css';
import MainMenuBar from './../MainMenuBar';
import {getMoviesByGenre, readCookie} from '../../services/api'
import "./../universalStyles.css"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


class Genre extends React.Component {
    constructor(props) {
        super(props);
        this.goToMoviePage = this.goToMoviePage.bind(this)
    }
    state = {
        data: [],
        genre: ""
    }
    async componentDidMount() {
        await readCookie(this);
        this.setState({genre: this.props.match.params.genre})
        const genre = this.props.match.params.genre
        const res = await getMoviesByGenre(genre)
        if(res){
            this.setState({genre: genre})
            this.setState({data: res.data})
        }
    }

    goToMoviePage(id){
     this.props.history.push({pathname: "/movie/" + id})   
    }

    render(){
        if(this.state.data === []){
            return(<div>
                <MainMenuBar username={this.state.currentUser}></MainMenuBar>
                <div>404 No Movies With This Genre Were Found</div>
            </div> 
           );
            }
        else{
            const movieElements = this.state.data.map((movie) => {
                return <Card className="genreCard" key={movie._id}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {movie.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {movie.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() => this.goToMoviePage(movie._id)} size="small" color="primary">
                            View
                            </Button>
                        </CardActions>
                    </Card>
                    })
            return(
                
                <div id="pageFeed">
                <MainMenuBar username={this.state.currentUser}></MainMenuBar>
                

                <div id="movieList">
                    <div className="genreTitleBox">
                    <h3 className="genreHeaderText">{this.state.genre}</h3>
                    </div>
                    {movieElements}
                </div>
                </div>
                
            );
        }
        
    }
}
export default Genre;