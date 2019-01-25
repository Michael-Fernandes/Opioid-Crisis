import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./Main"

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
