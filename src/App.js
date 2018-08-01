import React, { Component } from 'react';
import './App.css';
import * as api from './Api';

class App extends Component {
  componentDidMount = () => {
    api.getBooks();
    console.log('this is the data being called in componentDidMount');
  };
  render() {
    return (
      <div className="App-container">
        <header className="App-header">
          <h1 className="App-title">Google Books Data App</h1>
        </header>
        <section className="books-container">
          <h1>JG Ballard Books</h1>
          books go here
        </section>
        <section className="data-visualisation-container">
          <div className="buttons-container">
            <button className="button">1</button>
            <button className="button">2</button>
          </div>
          <div className="chart-container">Data visualisation goes here</div>
        </section>
      </div>
    );
  }
}

export default App;
