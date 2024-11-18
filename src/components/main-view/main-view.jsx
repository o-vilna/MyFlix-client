import {useEffect, useState} from "react";

import {MovieCard} from "../movie-card/movie-card";

import {MovieView} from "../movie-view/movie-view";


const MainView = () => {
  const [movies, setMovies] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch ("https://star-flix-5d32add713bf.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((doc) => {
        return {
          image: doc.ImagePath,
          id: doc._id,
          title: doc.Title,
          description: doc.Description,
          genre: doc.Genre.Name,
          director: doc.Director.Name,
          rating: doc.Rating,
          releaseYear: doc.ReleaseYear.slice(0, 4),
          featured: doc.Featured,
          actors: doc.Actors
        };
      });
      setMovies(moviesFromApi);
    });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    )
  }

  if (movies.length ===0) {
    return <div>The list is empty!</div>;
  }
  
  return (
    <div>
      {movies.map((movie) => (
     <MovieCard key={movie.id} movie = {movie} onMovieClick={() => {
      setSelectedMovie(movie);
      }}
      />
    ))}
    </div>
  );
};
export default MainView;