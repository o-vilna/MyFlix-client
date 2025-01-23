import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NaviBar } from "../navibar/navibar";
import ProfileView from "../profile-view/profile-view";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(storedFavorites || []);

  const isFavorite = (movieId) => favorites.includes(movieId);


  const addToFavorites = (movieId) => {
    if (!token) {
      return;
    }
    fetch(`https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!isFavorite(movieId)) {
          setFavorites([...favorites, movieId]); 
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("favorites", JSON.stringify(data.FavoriteMovies));
        }
      }).catch((error) => {
        console.error("Error:", error);
      })
      ;

    
  };

  const removeFromFavorites = (movieId) => {
    if (!token) {
      return;
    }
    fetch(`https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (isFavorite(movieId)) {
          setFavorites(favorites.filter((id) => id !== movieId));
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("favorites", JSON.stringify(data.FavoriteMovies));
        }
      }).catch((error) => {
        console.error("Error:", error);
      });

    
  }


  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://star-flix-5d32add713bf.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          image: doc.ImagePath,
          id: doc._id,
          title: doc.Title,
          description: doc.Description,
          genre: doc.Genre.Name,
          director: doc.Director.Name,
          rating: doc.Rating,
          releaseYear: parseInt(doc.ReleaseYear.slice(0, 4), 10),
          featured: doc.Featured,
          actors: doc.Actors,
        }));
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
      <BrowserRouter>
        <NaviBar
          user={user}
          setUser={setUser}
          setToken={setToken}
          onLoggedOut={handleLoggedOut}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                !user ? (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <Row className="g-4">
                    {movies.map((movie) => (
                      <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard
                          movie={movie}
                          isFavorite={
                            isFavorite(movie.id)
                          }
                          onFavorite={ isFavorite(movie.id) ? () => removeFromFavorites(movie.id) : () => addToFavorites(movie.id) }
                        />
                      </Col>
                    ))}
                  </Row>
                )
              }
            />
            <Route
              path="/movies/:Title"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>The list is empty!</div>
                ) : (
                  <MovieView
                    movies={movies}
                    onFavorite={(movieId) => console.log(movieId)}
                  />
                )
              }
            />

            <Route
              path="/profile"
              element={
                <Container className="mt-4">
                  <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                      <ProfileView
                        user={user}
                        movies={movies}
                        token={token}
                        setUser={setUser}
                        setToken={setToken}
                      />
                    </Col>
                  </Row>
                </Container>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </Container>
  );
};

export default MainView;
