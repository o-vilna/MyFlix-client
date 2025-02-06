import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Navigate } from "react-router-dom";

const ProfileView = ({
  user,
  setUser,
  setToken,
  movies,
  token,
  favoriteMovies,
  toggleFavorite,
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  console.log("Props received in ProfileView:", {
    user,
    token,
    movies,
    favoriteMovies,
  });

  const [username, setUsername] = useState(user?.Username || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(
    user?.Birth_date?.slice(0, 10) || ""
  );

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      Username: username,
      Email: email,
      Birth_date: birthday,
    };

    if (password.trim() !== "") {
      updatedUser.Password = password;
    }

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

        localStorage.setItem("user", JSON.stringify(data));
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
        alert("Error: " + error.message);
      });
  };

  return (
    <Row className="mb-5">
      <Col xs={12} md={6} className="mb-4">
        <Card className="max-w-100">
          <Card.Body>
            <h3 className="text-center mb-4">Account Information</h3>
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

              <div className="d-flex justify-content-between">
                <Col xs="auto">
                  <Button variant="danger" size="sm" onClick={handleDeregister}>
                    Delete Account
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button variant="primary" size="sm" type="submit">
                    Update
                  </Button>
                </Col>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Row>
        <Col xs={12}>
          <h3 className="mb-3">Favorites</h3>
          {favoriteMovies.length === 0 ? (
            <p>You have no favorite movies yet.</p>
          ) : (
            <Row>
              {favoriteMovies.map((movie) => (
                <Col
                  key={movie.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex mb-4"
                >
                  <MovieCard
                    movie={movie}
                    isFavorite={true}
                    onFavorite={() => toggleFavorite(movie.id)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Row>
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
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      genre: PropTypes.string,
      director: PropTypes.string,
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
      actors: PropTypes.array,
      rating: PropTypes.number,
      releaseYear: PropTypes.number,
    })
  ).isRequired,
};

export default ProfileView;
