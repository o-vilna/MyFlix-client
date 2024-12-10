import { createRoot } from "react-dom/client";
<<<<<<< HEAD

import {MainView} from "./components/main-view/main-view";
// Import statement to indicate that you need to bundle `./index.scss`
=======
import MainView from "./components/main-view/main-view";
>>>>>>> task-3.5
import "./index.scss";

const App = () => <MainView />;

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);