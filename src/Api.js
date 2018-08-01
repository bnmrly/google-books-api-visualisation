import axios from 'axios';

export const getBooks = async () => {
  const {
    data: { items }
  } = await axios.get(
    'https://www.googleapis.com/books/v1/volumes?q=inauthor:jg%20ballard&maxResults=40'
  );
  console.log(items, 'this is items');
};
