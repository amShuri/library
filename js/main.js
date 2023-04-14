function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}. The book has ${this.pages} pages. ${
    this.read.slice(0, 1).toUpperCase() + this.read.slice(1)
  }.`;
};

const firstBook = new Book(
  "Jurassic Park",
  "Michael Crichton",
  448,
  "not read yet"
);

const secondBook = new Book(
  "Aliens: Earth Hive",
  "Steve Perry",
  278,
  "not read yet"
);

const bookContainer = document.querySelector(".book-container");
const para = document.createElement("p");
bookContainer.appendChild(para);
para.textContent = firstBook.info();
