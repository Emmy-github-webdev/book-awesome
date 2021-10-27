// book class
/* eslint max-classes-per-file: ["error", 3] */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI class
class UI {
  addBookToList = (book) => {
    const list = document.getElementById('book-list');
    const listLi = document.createElement('tr');

    listLi.innerHTML = `
    <td>${book.title}</td> by
    <td>${book.author}</td>
    <td><a href="#" class="delete">Remove</a></td>
    `;
    list.appendChild(listLi);
  }

  showAlert = (message, className) => {
    // Create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    // Timeout after 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deletBook = (target) => {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

// Local storage class
class Store {
  // fetch book from local storage
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI();
      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded',
  Store.displayBooks);

// Event Listners to add book
document.getElementById('book-form').addEventListener('submit',
  (e) => {
    // get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // Instantiate  book
    const book = new Book(title, author);

    // Instantiate UI
    const ui = new UI();

    // Validate input
    if (title === '' || author === '') {
    // error message
      ui.showAlert('Please fill in all the fields', 'error');
    } else {
    // Add book to book list
      ui.addBookToList(book);

      // Add book to local storage
      Store.addBook(book);

      // success alert
      ui.showAlert('Book Added!', 'success');

      // clear fields after adding
      ui.clearFields();
    }

    e.preventDefault();
  });

// Event listner for delete
document.getElementById('book-list').addEventListener('click', (e) => {
  // Instantiate UI
  const ui = new UI();

  ui.deletBook(e.target);

  // Remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
});