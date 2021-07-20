import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { store } from "./redux/store";
import Home from "./pages/Home";

import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/User";

const App = () => {
  return (
    <Provider store={store}>
      <AnimateSharedLayout type="crossfade">
        <BrowserRouter>
          <Route exact path={["/home", "/home/:id"]}>
            <Register />
          </Route>
          <Route exact path={["/user", "/user/:id"]}>
            <UserPage />
          </Route>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </BrowserRouter>
      </AnimateSharedLayout>
    </Provider>
  );
};

export default App;
