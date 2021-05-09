import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { store } from "./redux/store";
import Home from "./pages/Home";

import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Provider store={store}>
      <AnimateSharedLayout type="crossfade">
        <BrowserRouter>
          <Route exact path={["/home", "/home/:id"]} component={Register} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </BrowserRouter>
      </AnimateSharedLayout>
    </Provider>
  );
};

export default App;
