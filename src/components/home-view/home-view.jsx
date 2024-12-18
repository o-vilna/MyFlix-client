import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { NaviBar } from "../navibar/navibar";

const HomeView = ({ user, setUser, token, setToken }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch("https://star-flix-5d32add713bf.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); 
        setFilteredMovies(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  // Обробка натискання на фільм
  const handleMovieClick = (movie) => {
    console.log("Selected movie:", movie);
  
  };

  return (
    <Container fluid className="bg-light text-dark min-vh-100 p-3">
      <NaviBar user={user} setUser={setUser} setToken={setToken} />
      <Row className="w-200">
        <Col md={6} className="mx-auto">
          <Form>
            <Form.Group className="mb-4" controlId="searchQuery">
              <Form.Control
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>

          <Row>
        
            {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <Col md={3} key={movie.id} className="mb-4">
                  <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                </Col>
              ))
            ) : (
              <p>No movies found</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeView;
