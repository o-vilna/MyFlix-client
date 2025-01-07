import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NaviBar } from "../navibar/navibar";
import { Container, Row, Col, Button } from "react-bootstrap";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://star-flix-5d32add713bf.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
            actors: doc.Actors,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <Container fluid className="bg-light text-dark min-vh-100 p-3">
      <NaviBar
        user={user}
        setUser={setUser}
        setToken={setToken}
        onLoggedOut={handleLoggedOut}
      />
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            {isLogin ? (
              <>
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
                <p>
                  Don't have an account?{" "}
                  <Button variant="link" onClick={() => setIsLogin(false)}>
                    Sign up
                  </Button>
                </p>
              </>
            ) : (
              <>
                <SignupView />
                <p>
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => setIsLogin(true)}>
                    Log in
                  </Button>
                </p>
              </>
            )}
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <Row className="g-4">
            {movies.map((movie) => (
              <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={() => {
                    setSelectedMovie(movie);
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default MainView;
