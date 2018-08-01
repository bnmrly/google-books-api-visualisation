import React from 'react';
import { generate as generateId } from 'shortid';
import moment from 'moment';

const BookList = ({ books }) => {
  console.log(books, 'this is books');
  return (
    <div className="all-books">
      {books.map(book => {
        const { title, pageCount, publishedDate } = book.volumeInfo;
        return (
          <div className="book-info" key={generateId()}>
            {book.volumeInfo.imageLinks ? (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={title} />
            ) : (
              <h5>No image available</h5>
            )}
            <p>Title: {title}</p>
            <p>Published date: {moment(publishedDate).format('YYYY')}</p>
            <p>Pagecount: {pageCount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
