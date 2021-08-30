import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

import { store } from "./redux/store";

import Main from "./components/Main";

const App = () => {
  const [token, setToken] = useState(undefined);

  useEffect(async () => {
    setToken(Cookies.get("spotifyAuthToken"));
  }, [token]);

  return (
    <Provider store={store}>
      <AnimateSharedLayout type="crossfade">
        <Main token={token} />
      </AnimateSharedLayout>
    </Provider>
  );
};

export default App;
