import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
 
export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100">
     <Card.Img variant="top" className="card-img-top" style= {{height:"400px", objectFit:"cover"}} src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
        Open
        </Button>
       </Card.Body>
       </Card>
);
};

MovieCard.propTypes = {
 movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool,
    actors: PropTypes.array,
    rating: PropTypes.number,
    releaseYear: PropTypes.number
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};