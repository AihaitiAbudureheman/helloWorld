import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import CreateStudent from "../pages/createStudent";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/createStudent">Create New</Link>
            </li>
          </ul>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/createStudent" component={CreateStudent} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
