import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./components/Home";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
