import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Companies from './containers/Companies/Companies';
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Companies />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
