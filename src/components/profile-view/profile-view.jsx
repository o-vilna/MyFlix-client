import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ user, setUser, setToken, movies, token }) => {
  console.log("Props received in ProfileView:", { user, token, movies });

  const [username, setUsername] = useState(user?.Username || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(
    user?.Birth_date?.slice(0, 10) || ""
  );
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Unauthorized: No token provided.");
      return;
    }

    fetch("https://star-flix-5d32add713bf.herokuapp.com/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const currentUser = data.find((u) => u.Username === user.Username);
        if (currentUser) {
          setUserData(currentUser);
        } else {
          setErrorMessage("User data not found.");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Error fetching user data:", error);
      });
  }, [token, user]);

  useEffect(() => {
    if (movies && user && Array.isArray(user.FavoriteMovies)) {
      const filteredMovies = movies.filter((movie) =>
        user.FavoriteMovies.includes(movie._id)
      );
      setFavoriteMovies(filteredMovies);
    }
  }, [movies, user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      Username: username,
      Email: email,
      Password: password || undefined,
      Birth_date: birthday,
    };

    fetch(
      `https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Profile updated successfully!");
        setUser(data);
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birth_date);
        setPassword("");
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error("Error:", error);
      });
  };

  const handleDeregister = () => {
    fetch(
      `https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("User deleted");
          localStorage.clear();
          setUser(null);
          setToken(null);
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .catch((error) => {
        alert("Error deleting user: " + error.message);
        console.error("Error deleting user:", error);
      });
  };

  const toggleFavoriteMovie = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);

    const method = isFavorite ? "DELETE" : "POST";
    fetch(
      `https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: method,
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
        alert(
          isFavorite
            ? "Movie removed from favorites!"
            : "Movie added to favorites!"
        );
      })
      .catch((error) => {
        console.error("Error updating favorite movies:", error);
        alert("Error: " + error.message);
      });
  };

  return (
    <Container fluid className="bg-light text-dark min-vh-100 p-3">
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Account Information</h2>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value || "")}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value || "")}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value || "")}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value || "")}
                  />
                </Form.Group>

                <Row className="d-flex justify-content-between">
                  <Col xs="auto">
                    <Button variant="warning" onClick={handleDeregister}>
                      Delete Account
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="primary" size="sm" type="submit">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>Favorite Movies</h3>
          <Row>
            {favoriteMovies.length === 0 ? (
              <p>You have no favorite movies yet.</p>
            ) : (
              favoriteMovies.map((movie) => (
                <Col md={4} key={movie._id}>
                  <MovieCard
                    movie={movie}
                    isFavorite={user.FavoriteMovies.includes(movie.id)}
                    onFavorite={() => toggleFavoriteMovie(movie._id)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    Email: PropTypes.string,
    Birth_date: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  token: PropTypes.string,
};
export default ProfileView;
