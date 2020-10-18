import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./styles.css";

class MovieCard extends React.Component {
  constructor(props) {
      super(props);
      this.goToMoviePage = this.goToMoviePage.bind(this);
  }
  goToMoviePage(movie) {
      this.props.history.push({pathname: "/movie/" + movie})
    }
render(){
  const { movieID, title, imageURL } = this.props;
  return (
    <div className="movie">
    <Card className="root">
      <CardActionArea className="titleBack">
        <CardMedia
          className="media"
          image={imageURL}
          title={title}
        />
        <CardContent className="titleBack">
          <Typography gutterBottom variant="h5" component="h2" className="titleFont">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="titleBack">
        <Button size="small" color="primary" onClick={() => this.goToMoviePage(movieID)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
}

export default MovieCard;
