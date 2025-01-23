import "./movie-view.scss";
import PropTypes from "prop-types";
import {Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useParams } from "react-router";


const MovieView = ({ movies, onFavorite}) => {
  const {Title} = useParams();

  const movie = movies.find((b) => b.title === Title);

  return (
    <div className="movie-view">
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <Card className="h-100 position-relative">
            <Row>
              <Col xs={12} md={6}>
              <div className="image-section ml-md-3">
                <Card.Img
                  variant="top"
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                  }}
                />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Card.Body>
                <div className="text-section">
                  <Card.Title className="fw-bold">{movie.title}</Card.Title>
                  <Card.Text><strong>Rating:</strong> {movie.rating}</Card.Text>
                  <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
                  <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
                  <Card.Text><strong>Description:</strong> {movie.description}</Card.Text>
                  </div>

                  <div className="position-absolute bottom-0 end-0 m-3">
                    <Link to={`/`}>
                  <Button className="back-button" size="sm">
                    Back
                  </Button>
                  </Link>
                  </div>    
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number, // Додаємо рейтинг, якщо це необхідно
    })
  ).isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MovieView;