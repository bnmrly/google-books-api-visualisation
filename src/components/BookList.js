import React from 'react';
import { generate as generateId } from 'shortid';
import moment from 'moment';

const BookList = ({ books }) => {
  // console.log(books, '76575');
  return (
    <div className="all-books">
      {books.map(book => {
        const { title, pageCount, publishedDate } = book.volumeInfo;
        return (
          <div className="book-info" key={generateId()}>
            <h2>{title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
