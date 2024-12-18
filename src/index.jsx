import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import MainView from "./components/main-view/main-view";
import ProfileView from "./components/profile-view/profile-view";
import { LoginView } from "./components/login-view/login-view";
import  HomeView from "./components/home-view/home-view";
import Container from "react-bootstrap/Container";

import "./index.scss";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <>
        <Container fluid className="bg-light text-dark min-vh-100 p-3">
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/movies" /> : <LoginView onLoggedIn={(user) => setUser(user)} />
              }
            />
              <Route
              path="/home"
              element={
                user ? (
                  <HomeView
                    user={user} 
                    setUser={setUser}
                    token={token}
                    setToken={setToken}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/movies"
              element={
                user ? <MainView user={user} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/profile"
              element={
                user ? <ProfileView user={user} /> : <Navigate to="/" />
              }
            />
          </Routes>
        </Container>
      </>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);

export default App;
