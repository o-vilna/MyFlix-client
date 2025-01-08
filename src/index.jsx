import React from "react";
import { createRoot } from "react-dom/client";
import MainView from "./components/main-view/main-view";
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
