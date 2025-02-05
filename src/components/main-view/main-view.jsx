import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { NaviBar } from "../navibar/navibar";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(storedFavorites || []);
  const [searchQuery, setSearchQuery] = useState("");

  const isFavorite = (movieId) => favorites.includes(movieId);

  const handleToggleFavorite = (movieId) => {
    const isAlreadyFavorite = isFavorite(movieId);
    const method = isAlreadyFavorite ? "DELETE" : "POST";

    fetch(
      `https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        setFavorites(updatedUser.FavoriteMovies);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem(
          "favorites",
          JSON.stringify(updatedUser.FavoriteMovies)
        );
        alert(
          isAlreadyFavorite
            ? "Movie removed from favorites!"
            : "Movie added to favorites!"
        );
      })
      .catch((error) => {
        console.error("Error updating favorite movies:", error);
        alert("Error: " + error.message);
      });
  };

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
  };

  useEffect(() => {
    if (!token) return;
    fetch("https://star-flix-5d32add713bf.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
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
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Container fluid className="bg-light text-dark min-vh-100 p-3">
      <BrowserRouter>
        <NaviBar
          user={user}
          onLoggedOut={handleLoggedOut}
          onSearch={handleSearch}
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
                        const storedFavorites =
                          JSON.parse(localStorage.getItem("favorites")) || [];
                        setFavorites(storedFavorites);
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
                ) : (
                  <Col xs={12}>
                    {filteredMovies.length === 0 ? (
                      <div>No movies found!</div>
                    ) : (
                      <Row className="g-4">
                        {filteredMovies.map((movie) => (
                          <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <MovieCard
                              movie={movie}
                              isFavorite={isFavorite(movie.id)}
                              onFavorite={() => handleToggleFavorite(movie.id)}
                            />
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Col>
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
                    onFavorite={handleToggleFavorite}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                user ? (
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    setUser={setUser}
                    setToken={setToken}
                    favoriteMovies={movies.filter((movie) =>
                      favorites.includes(movie.id)
                    )}
                    toggleFavorite={handleToggleFavorite}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </Container>
  );
};

export default MainView;
