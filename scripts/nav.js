const add = document.getElementById('add');
const list = document.getElementById('list');
const contact = document.getElementById('contact');
const listSection = document.getElementById('listSection');
const newBookSection = document.getElementById('newBookSection');
const contactSection = document.getElementById('contactSection');

list.addEventListener('click', () => {
  newBookSection.style.display = 'none';
  contactSection.style.display = 'none';

  listSection.style.animation = 'show-section 0.3s ease-out';

  setTimeout(() => {
    listSection.style.display = 'block';
  }, 300);
});

add.addEventListener('click', () => {
  listSection.style.display = 'none';
  contactSection.style.display = 'none';

  newBookSection.style.animation = 'show-section 0.3s ease-out';

  setTimeout(() => {
    newBookSection.style.display = 'block';
  }, 300);
});

contact.addEventListener('click', () => {
  listSection.style.display = 'none';
  newBookSection.style.display = 'none';

  contactSection.style.animation = 'show-section 0.3s ease-out';

  setTimeout(() => {
    contactSection.style.display = 'block';
  }, 300);
});