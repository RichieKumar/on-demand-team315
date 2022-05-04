import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NavBar, Footer } from "./components";
import  { Home, Profile, ExternalApi, Chat} from "./views";

import "./App.css";

const App = () => {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/external-api" component={ExternalApi} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
