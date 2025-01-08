import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img
        className="card-img-top"
        style={{ height: "400px", objectFit: "cover" }}
        src={movie.image}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{movie.title}</Card.Title>
        <Card.Text className="flex-grow-1">{movie.description}</Card.Text>
        <Button
          onClick={() => onMovieClick(movie)}
          variant="link"
          className="mt-auto"
        >
          More Info
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
    releaseYear: PropTypes.number,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
