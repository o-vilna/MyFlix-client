import "./movie-view.scss";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <Row>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <p><strong> Rating:</strong> {movie.rating}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <Button onClick={onBackClick} className="back-button">
            Back
          </Button>
        </Col>
        <Col md={4}>
          <img
            src={movie.image}
            alt={movie.title}
            className="img-fluid"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
