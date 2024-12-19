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

  return (
        <Container fluid className="bg-light text-dark min-vh-100 p-3">
        <MainView />
        </Container>
    
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);

export default App;
