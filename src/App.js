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

    // returns array of all publication years, sorted chronologically

    const allYears = books
      .map(book => moment(book.volumeInfo.publishedDate).format('YYYY'))
      .sort();

    // returns array of the unique publication years

    const publicationYears = Array.from(new Set(allYears));

    // creates a tally object of the books in a year

    const bookTally = allYears.reduce((acc, el) => {
      acc[el] ? acc[el]++ : (acc[el] = 1);
      return acc;
    }, {});

    // creates array of values from the tally object

    const booksPerYear = Object.values(bookTally);

    const yearData = {
      labels: publicationYears,
      datasets: [
        {
          data: booksPerYear,
          backgroundColor: cssColorNames,
          hoverBackgroundColor: cssColorNames
        }
      ]
    };

    // returns array of all page counts, sorted chronologically

    const sortPageAsc = (a, b) => {
      return a - b;
    };

    const allPageCounts = books
      .map(book => book.volumeInfo.pageCount)
      .sort(sortPageAsc);

    // returns array of the unique page counts

    const uniquePageCounts = Array.from(new Set(allPageCounts));

    // creates a tally object of all the pageCounts

    const pageCountTally = allPageCounts.reduce((acc, el) => {
      acc[el] ? acc[el]++ : (acc[el] = 1);
      return acc;
    }, {});

    // creates array of values from the tally object

    const numbersOfPageCounts = Object.values(pageCountTally);

    const PageCountData = {
      labels: uniquePageCounts,
      datasets: [
        {
          data: numbersOfPageCounts,
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
            <button onClick={this.handleClick} value="year" className="button">
              Year
            </button>
            <button
              onClick={this.handleClick}
              value="pageCount"
              className="button"
            >
              Page Count
            </button>
          </div>
          <div className="chart-container">
            {/* <Pie data={yearData} /> */}
            <Pie data={PageCountData} />
          </div>
        </section>
      </div>
    );
  }

  handleClick = event => {
    console.dir(event.target.value);
    // console.log('this has been clicked!');
  };
}

export default App;
