import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StockPrice from "./pages/StockPrice";

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
