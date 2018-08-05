import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BookList from './components/BookList';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import cssColorNames from './utils/cssColorNames';

class App extends Component {
  state = {
    books: [],
    chartTitle: '',
    chartDataType: {}
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
          <h1 className="App-title">Google Books Api Data Visualisation</h1>
        </header>
        <section className="books-container">
          <h1>JG Ballard Books</h1>
          <BookList books={this.state.books} />
        </section>
        <section className="data-visualisation-container">
          <div className="data-pie" />
          <div className="buttons-container">
            <button onClick={this.getYearData} className="button">
              Year
            </button>
            <button
              onClick={this.getPageCountData}
              value="pageCount"
              className="button"
            >
              Page Count
            </button>
            <button
              onClick={this.getCategories}
              value="pageCount"
              className="button"
            >
              Other Data
            </button>
          </div>
          <div className="chart-container">
            <h1> {this.state.chartTitle}</h1>
            <Pie data={this.state.chartDataType} />
          </div>
        </section>
      </div>
    );
  }

  getYearData = () => {
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

    this.setState({
      chartTitle: 'Books Per Year',
      chartDataType: yearData
    });
  };

  getPageCountData = () => {
    const { books } = this.state;

    // returns array of all page counts, sorted chronologically

    const sortPageAsc = (a, b) => {
      return a - b;
    };

    const allPageCounts = books
      .map(book => book.volumeInfo.pageCount)
      .sort(sortPageAsc);

    // returns array of the unique page counts

    const uniquePageCounts = Array.from(new Set(allPageCounts));

    console.log(uniquePageCounts);

    // creates a tally object of all the pageCounts

    const pageCountTally = allPageCounts.reduce((acc, el) => {
      acc[el] ? acc[el]++ : (acc[el] = 1);
      return acc;
    }, {});

    // creates array of values from the tally object

    const numbersOfPageCounts = Object.values(pageCountTally);

    const pageCountData = {
      labels: uniquePageCounts,
      datasets: [
        {
          data: numbersOfPageCounts,
          backgroundColor: cssColorNames,
          hoverBackgroundColor: cssColorNames
        }
      ]
    };

    this.setState({
      chartTitle: 'Page count per Book',
      chartDataType: pageCountData
    });
  };

  getCategories = () => {
    const { books } = this.state;

    // returns array of all categories

    const allCategories = books
      .map(book => {
        return book.volumeInfo.categories;
      })
      .sort();

    // console.log(allCategories);

    // returns array of the unique categories

    const uniqueCategories = Array.from(new Set([].concat(...allCategories)));

    // creates a tally object of all the categories

    const categoryTally = allCategories.reduce((acc, el) => {
      acc[el] ? acc[el]++ : (acc[el] = 1);
      return acc;
    }, {});

    // creates array of values from the tally object

    const numbersOfCategories = Object.values(categoryTally);

    const categoryData = {
      labels: uniqueCategories,
      datasets: [
        {
          data: numbersOfCategories,
          backgroundColor: cssColorNames,
          hoverBackgroundColor: cssColorNames
        }
      ]
    };

    this.setState({
      chartTitle: 'Book categories',
      chartDataType: categoryData
    });
  };
}

export default App;
