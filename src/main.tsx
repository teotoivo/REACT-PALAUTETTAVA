import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
import App from "./App";
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
