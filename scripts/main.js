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

const displayBooks = () => {
  retrievedBooks = JSON.parse(localStorage.getItem('books'));
  retrievedBooks.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('book');
    div.innerHTML = `
    <h5>${book.title}</h5>  
    <p>${book.author}</p>  
    <button class="remove">remove</button>
    <hr>
  `;
    booksList.appendChild(div);
  });
};

const addBook = (e) => {
  retrievedBooks = JSON.parse(localStorage.getItem('books'));
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const book = {
    title,
    author,
  };
  book.id = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  retrievedBooks.push(book);
  localStorage.setItem('books', JSON.stringify(retrievedBooks));
  titleInput.value = '';
  authorInput.value = '';
  const div = document.createElement('div');
  div.classList.add('book');
  div.dataset.id = book.id;
  div.innerHTML = `
    <h5>${book.title}</h5>  
    <p>${book.author}</p>  
    <button class="remove">remove</button>
    <hr>
  `;
  booksList.appendChild(div);
};

const removeBook = (elem) => {
  if (elem.classList.contains('remove')) {
    elem.parentElement.remove();
  }
};
document.addEventListener('DOMContentLoaded', displayBooks);
addButton.addEventListener('click', addBook);
booksList.addEventListener('click', (e) => {
  removeBook(e.target);
  const newBooks = JSON.parse(localStorage.getItem('books'));
  newBooks.forEach((book, index) => {
    if (book.author === e.target.previousElementSibling.textContent) {
      newBooks.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(newBooks));
});