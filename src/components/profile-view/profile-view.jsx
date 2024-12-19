import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {NaviBar} from "../navibar/navibar";
import {MovieCard} from "../movie-card/movie-card";

const ProfileView = ({ user, setUser, setToken, movies,token }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(user.birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!movies || !user) {
      return;
    }
  
    const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
    setFavoriteMovies(favoriteMovies);
  }, [user, movies]);
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    
    const updatedUser = {
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday
    };

 
    fetch(`https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
         "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Profile updated successfully!");
        } else {
          setErrorMessage("Failed to update profile.");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred while updating profile.");
        console.error("Error:", error);
      });
  };

  const handleDeregister =() => {
    fetch(`https://star-flix-5d32add713bf.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE' ,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      alert('User deleted');
      localStorage.clear();
      window.location.reload();
    })
    .catch(err => console.error(err));
  };

  return (
    <Container fluid className="bg-light text-dark min-vh-100 p-3">
       <NaviBar user={user} setUser={setUser} setToken={setToken}/>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Account Information</h2>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Row className="d-flex justify-content-between">
                <Col xs="auto">
                <Button variant="warning" onClick={handleDeregister}>Delete Account</Button>
                </Col>
                <Col xs="auto">
              <Button variant="primary" type="submit">
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
            favoriteMovies.map(movie => (
              <Col md={4} key={movie.id}>
                <MovieCard movie={movie} />
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
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string
    })
  ).isRequired,
  token: PropTypes.string.isRequired
};

export default ProfileView;
