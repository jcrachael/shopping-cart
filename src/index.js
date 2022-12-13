// React etc
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./styles/index.css";
import Template from "./routes/Template";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Shop from "./routes/Shop";

// Router config
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/shopping-cart/"
      element={<Template />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="/shopping-cart/shop" element={<Shop />} />
      </Route>
    </Route>
  )
);

// Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
