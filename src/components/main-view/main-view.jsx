import {useEffect, useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [user, setUser] =useState(storedUser? storedUser: null);

  const [token, setToken] = useState(storedToken? storedToken: null);

  const [movies, setMovies] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  const[isLogin,setIsLogin] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch ("https://star-flix-5d32add713bf.herokuapp.com/movies", {headers: {Authorization: `Bearer ${token}`}})
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
  }, [token]);

  if (!user) {
    return (
      <div>
        {isLogin ? (
          <div>
      <LoginView 
      onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
      />
      <p>
        Don't have an account?{""}
        <button onClick={() => setIsLogin(false)}>Sign up </button>
        </p>
        </div>
        ) :(
          <div>
      <SignupView/>
      <p>
        Already have an account?{""}
        <button onClick={()=> setIsLogin(true)}>Log in</button>
      </p>
      </div>
        )}
        </div>
    );
  }

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
    <button onClick={()=> {setUser(null); setToken(null);localStorage.clear();}}>Logout</button>;
    </div>
  );
};

export default MainView;