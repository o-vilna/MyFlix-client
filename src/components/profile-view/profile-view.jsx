import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {NaviBar} from "../navibar/navibar";

const ProfileView = ({ user, setUser, setToken }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(user.birthday);
  const [errorMessage, setErrorMessage] = useState("");

  // Функція для обробки оновлення профілю
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const updatedUser = {
      username,
      email,
      password,
      birthday
    };

    // Надіслати дані для оновлення на сервер
    fetch("https://star-flix-5d32add713bf.herokuapp.com/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedUser),
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

                <Button variant="primary" type="submit" className="float-end">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
