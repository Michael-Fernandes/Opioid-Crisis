import React, { Component } from 'react';
import Main from "./Main"
//To see if people use share feature
import ReactGA from 'react-ga';
//Need router to handle url sharing
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactGA.initialize('UA-133428628-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
