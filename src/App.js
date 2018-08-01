import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BookList from './components/BookList';

class App extends Component {
  state = {
    books: []
  };

  componentDidMount = async () => {
    try {
      const {
        data: { items }
      } = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=inauthor:jg%20ballard&maxResults=40'
      );
      this.setState({
        books: items
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="App-container">
        <header className="App-header">
          <h1 className="App-title">Google Books Data App</h1>
        </header>
        <section className="books-container">
          <h1>JG Ballard Books</h1>
          <BookList books={this.state.books} />
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
