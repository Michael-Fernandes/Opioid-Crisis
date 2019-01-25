import React, { Component } from 'react';
import Main from "./Main"

//Need router to handle url sharing
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
          <Route path="/" component={Main} />
      </Router>
    );
  }
}

export default App;
