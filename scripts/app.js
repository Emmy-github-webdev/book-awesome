//Book Constructor
function Book(title, author) {
  this.title = title;
  this.author = author;
}

//UI constructor
function UI(){}

//add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const listLi = document.createElement('li');

  listLi.innerHTML = `
    <p>
      ${book.title} by ${book.author}
      <a href="#" class="delete">Remove</a>
    </p>
  `;
  list.appendChild(listLi);
}

//show alert
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  //Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

//Delete Book
UI.prototype.deletBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

//Event Listners to add book
document.getElementById('book-form').addEventListener('submit',
function(e) {

  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  // Instantiate  book
  const book = new Book(title, author);

  // Instantiate UI
  const ui = new UI();

  //Validate input
  if (title === '' || author === '') {
    //error message
    ui.showAlert('Please fill in all the fields', 'error');
  } else {
    //Add book to book list
    ui.addBookToList(book);

    //success alert
    ui.showAlert('Book Added!', 'success');

    //clear fields after adding
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listner for delete
document.getElementById('book-list').addEventListener
('click', function(e) {
 
  //Instantiate UI
  const ui = new UI();

  ui.deletBook(e.target);

  //Show message
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
})