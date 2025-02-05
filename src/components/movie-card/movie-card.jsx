import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite, onFavorite }) => {
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
        <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
          <Button variant="link" className="mt-auto">
            More Info
          </Button>
        </Link>
        <Button
          variant={isFavorite ? "danger" : "primary"}
          className="mt-2"
          onClick={() => {
            if (onFavorite) {
              onFavorite(movie.id);
            }
          }}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
  isFavorite: PropTypes.bool.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MovieCard;
