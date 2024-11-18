import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
  onClick={() => {
    onMovieClick(movie);
    }}
    > {movie.title}
      </div>
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
    releaseyear: PropTypes.number
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};