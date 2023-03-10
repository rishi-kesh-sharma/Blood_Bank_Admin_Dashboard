import React, { useState } from "react";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import rootReducer from "./reducers/rootReducer";

import { Banks } from "./components";
//mui stuff

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import Overview from "./components/Overview";
import NoMatch from "./components/NoMatch";
import Messages from "./components/Messages";

const store = createStore(rootReducer);
const App = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Messages />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="banks" element={<Banks />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
export { store };
