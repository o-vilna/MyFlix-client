import {useState} from "react";

import {MovieCard} from "../movie-card/movie-card";

import {MovieView} from "../movie-view/movie-view";


const MainView = () => {
  const [movies, setMovies] = useState([
    {id:1, image: "https://m.media-amazon.com/images/I/51LlIEE-XFL.jpg", title: "Good Will Hunting", description: "Will Hunting, a janitor at MIT, has a gift for mathematics, but needs help from a psychologist to find direction in his life.",genre:"Drama", director:"Gus Van Sant"},
    {id:2, image:"https://m.media-amazon.com/images/I/8151Jk+voPL._SL1500_.jpg", title: "Silence of the Lambs",description:"A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", genre:"Thriller",director:"Jonathan Demme"},
    {id:3, image:"https://m.media-amazon.com/images/I/717hL1ShXvL._SL1200_.jpg", title: "Inception", description:"A thief who steals corporate secrets through the use of dream-sharing technology.", genre:"Science Fiction", director:"Christopher Nolan"},
    {id:4, image:"https://m.media-amazon.com/images/I/611hCUJj+yL._SL1200_.jpg", title: "The Dark Knight", description:"When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", genre:"Crime",director:"Christopher Nolan"},
    {id:5, image:"https://m.media-amazon.com/images/I/91OUyksquTL._SL1500_.jpg", title: "Django Unchained", description:"A bounty-hunter named King Schultz seeks out a slave named Django and buys him because he needs him to find some men he is looking for.",genre:"Comedy",director:"Quentin Tarantino"}
  ]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

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