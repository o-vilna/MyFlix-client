import { createRoot } from "react-dom/client";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import {NaviBar} from "./components/navibar/navibar"

import "./index.scss";

const App = () => {
  return (
    <>
    <NaviBar />
    <Container>
    <MainView />
    </Container>
    </>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);