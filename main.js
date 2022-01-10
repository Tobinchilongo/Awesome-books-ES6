const bookList = document.querySelector('.books');
const form = document.getElementById('newBook');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const list = document.querySelector('.container');
const addNewBook = document.querySelector('.new-book');
const contact = document.querySelector('.contact');
const navItem1 = document.querySelector('.nav-item-1');
const navItem2 = document.querySelector('.nav-item-2');
const navItem3 = document.querySelector('.nav-item-3');

navItem1.addEventListener('click', () => {
  addNewBook.style.display = 'none';
  contact.style.display = 'none';
  list.style.display = 'block';
});

navItem2.addEventListener('click', () => {
  list.style.display = 'none';
  contact.style.display = 'none';
  addNewBook.style.display = 'block';
});

navItem3.addEventListener('click', () => {
  addNewBook.style.display = 'none';
  list.style.display = 'none';
  contact.style.display = 'flex';
});

let bookss = [];
class BookClass {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  bookCode() {
    return `<li><div class="list-items">
    <p>"${this.title}" by ${this.author}</p>
    <button type="button" data-id='${this.id}' class="remove">remove</button>
    </div>
  </li>`;
  }

  static addBook(book) {
    let id = 1;
    if (bookss.length > 0) {
      id = bookss[bookss.length - 1].id + 1;
    }
    book.id = id;
    bookss.push(book);
    localStorage.setItem('bookss', JSON.stringify(bookss));
  }

  static remove(id) {
    bookss = bookss.filter((b) => b.id !== Number(id));
    localStorage.setItem('bookss', JSON.stringify(bookss));
  }
}

const storedBooks = JSON.parse(localStorage.getItem('bookss'));

function showBooks() {
  const booksCode = bookss.map((book) => new BookClass(book.title, book.author, book.id)
    .bookCode());
  bookList.innerHTML = booksCode.join('');

  const btn = document.querySelectorAll('.remove');

  btn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      BookClass.remove(id);
      showBooks();
    });
  });
}

if (storedBooks) {
  bookss = storedBooks;
  showBooks();
}

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
  const date = new Date();
  document.querySelector('.time').innerHTML = date;
};

document.addEventListener('DOMContentLoaded', () => {
  displayTime();
  setInterval(() => {
    displayTime();
  }, 1000);
});
