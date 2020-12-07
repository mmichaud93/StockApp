import React from "react";
import ReactGA from "react-ga";
import "./App.scss";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StockPrice from "./pages/StockPrice";

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname);

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/" component={StockPrice}></Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
