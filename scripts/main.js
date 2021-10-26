const addButton = document.querySelector('.add-btn');
const booksList = document.querySelector('.book-ul');
const authorInput = document.querySelector('.author-input');
const titleInput = document.querySelector('.title-input');

const books = [];
let retrievedBooks;
if (localStorage.getItem('books') === null) {
  retrievedBooks = localStorage.setItem('books', JSON.stringify(books));
} else {
  retrievedBooks = JSON.parse(localStorage.getItem('books'));
}