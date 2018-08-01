import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BookList from './components/BookList';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import cssColorNames from './utils/cssColorNames';

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
    const { books } = this.state;

    const allYears = books
      .map(book => moment(book.volumeInfo.publishedDate).format('YYYY'))
      .sort();

    const publicationYears = Array.from(new Set(allYears));

    const bookTally = array => {
      const reduced = array.reduce((acc, el) => {
        acc[el] ? acc[el]++ : (acc[el] = 1);
        return acc;
      }, {});
      return Object.values(reduced);
    };

    const booksPerYear = bookTally(allYears);

    const pieData = {
      labels: publicationYears,
      datasets: [
        {
          data: booksPerYear,
          backgroundColor: cssColorNames,
          hoverBackgroundColor: cssColorNames
        }
      ]
    };

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
          <div className="data-pie" />
          <div className="buttons-container">
            <button className="button">1</button>
            <button className="button">2</button>
          </div>
          <div className="chart-container">
            Data visualisation goes here
            <Pie data={pieData} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
