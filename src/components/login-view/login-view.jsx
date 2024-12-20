import React, {useState} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit =(event) =>{
    event.preventDefault();
  

const data = {
  Username: username,
  Password: password,
};

fetch("https://star-flix-5d32add713bf.herokuapp.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
  console.log("Login response:", data);

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    onLoggedIn(data.user, data.token);
  } else {
    alert("No such user");
  }
})
.catch((e) => {
  alert("Something went wrong");
});
};

return (
  <Container fluid className="d-flex justify-content-center align-items-center">
    <Row className="justify-content-center mt-5">
      <Col md={8}></Col>
      <Col>
        <div className="text-center" style={{ marginBottom: "30px" }}>
          <h2>Welcome to myFlix</h2>
          <p>Login to access the movies and manage your profile!</p>
        </div>
        <Card className="border-0 shadow-none">
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "2rem" }}>
              <Form className="login-border" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

LoginView.propTypes = {
onLoggedIn: PropTypes.func.isRequired,
};