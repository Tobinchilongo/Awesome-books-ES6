/* eslint-disable no-unused-vars */
import { BookClass, showBooks } from './modules/book.js';
import Date from './modules/time.js';

let bookss = [];
const storedBooks = JSON.parse(localStorage.getItem('bookss'));
if (storedBooks) {
  bookss = storedBooks;
  showBooks();
}

const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const form = document.getElementById('newBook');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }

  const newBook = new BookClass(title, author);
  BookClass.addBook(newBook);
  showBooks();
  titleInput.value = '';
  authorInput.value = '';
});

const displayTime = () => {
  document.querySelector('.time').innerHTML = Date;
};

document.addEventListener('DOMContentLoaded', () => {
  displayTime();
  setInterval(() => {
    displayTime();
  }, 1000);
});
