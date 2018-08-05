import React from 'react';
import { generate as generateId } from 'shortid';

const BookList = ({ books }) => {
  return (
    <div className="all-books">
      {books.map(book => {
        const { title, pageCount, publishedDate } = book.volumeInfo;
        return (
          <div className="book-info" key={generateId()}>
            {book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                className="image-thumbnail"
                alt={title}
              />
            ) : (
              // <h5>No image available</h5>
              <div className="image-placeholder">
                <p className="p-placeholder">No image available</p>
              </div>
            )}
            <p>Title: {title}</p>
            <p>Published date: {publishedDate.slice(0, 4)}</p>
            <p>Pagecount: {pageCount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
