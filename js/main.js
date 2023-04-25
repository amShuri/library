const myLibrary = [];
const promptBox = document.querySelector(".prompt-box");
const promptBg = document.querySelector(".prompt-bg");

const FORM_INPUT_IDS = {
  title: "#title",
  author: "#author",
  genre: "#genre",
  pages: "#pages",
  hasRead: "#has-read",
};

function retrieveFormInput(item) {
  return document.querySelector(FORM_INPUT_IDS[item]);
}

function Book() {
  this.title = retrieveFormInput("title").value;
  this.author = retrieveFormInput("author").value;
  this.genre = retrieveFormInput("genre").value;
  this.pages = retrieveFormInput("pages").value;
  this.hasRead = retrieveFormInput("hasRead").checked ? "Read" : "Unread";
}

function displayOrHidePromptBox() {
  promptBox.classList.toggle("visible");
  promptBg.classList.toggle("visible");
}

function createParagraph(value) {
  const paragraph = document.createElement("p");
  paragraph.textContent = value;
  return paragraph;
}

function updateReadStatus(selectedBook, selectedBookBtn) {
  const bookItem = selectedBook;
  const bookButton = selectedBookBtn;
  if (selectedBook.hasRead === "Unread") {
    bookItem.hasRead = "Read";
    bookButton.textContent = "Read";
  } else {
    bookItem.hasRead = "Unread";
    bookButton.textContent = "Unread";
  }
  bookButton.classList.toggle("read");
}

function removeBookCard(bookObject, bookCardItem) {
  /* This function removes the book from the array based
   * on its data-index value previously set on the element.
   * Then it re-arranges the index of the remaining items
   * accordingly.
   */
  const bookIndex = bookCardItem.getAttribute("data-index");
  bookObject.splice(bookIndex, 1);
  bookCardItem.remove();

  const allBookCards = document.querySelectorAll(".main__book-card");
  allBookCards.forEach((card, index) => {
    card.setAttribute("data-index", index);
  });
}

function createBookCard(book) {
  // Destructure the book's object to avoid code repetition
  const { title, author, genre, pages, hasRead } = book;
  const mainContainer = document.querySelector(".main__container");

  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h3");
  bookCard.setAttribute("data-index", myLibrary.indexOf(book));
  bookTitle.textContent = title;

  const bookAuthorContainer = document.createElement("div");
  const bookAuthorLabel = createParagraph("Author:");
  const bookAuthor = createParagraph(author);

  const bookGenreContainer = document.createElement("div");
  const bookGenreLabel = createParagraph("Genre:");
  const bookGenre = createParagraph(genre);

  const bookPagesContainer = document.createElement("div");
  const bookPagesLabel = createParagraph("Pages:");
  const bookPages = createParagraph(pages);

  const hasReadBtnContainer = document.createElement("div");
  const hasReadBookBtn = document.createElement("button");
  hasReadBookBtn.textContent = hasRead;
  hasRead === "Read" ? hasReadBookBtn.classList.add("read") : "";

  const removeBookBtnContainer = document.createElement("div");
  const removeBookBtn = document.createElement("span");
  removeBookBtn.textContent = "delete";

  bookCard.classList.add("main__book-card");
  hasReadBookBtn.classList.add("has-read-button");
  removeBookBtnContainer.classList.add("remove-button");
  removeBookBtn.classList.add("material-symbols-outlined", "remove");

  mainContainer.appendChild(bookCard);
  bookCard.append(
    bookTitle,
    bookAuthorContainer,
    bookGenreContainer,
    bookPagesContainer,
    hasReadBtnContainer,
    removeBookBtnContainer
  );

  bookAuthorContainer.append(bookAuthorLabel, bookAuthor);
  bookGenreContainer.append(bookGenreLabel, bookGenre);
  bookPagesContainer.append(bookPagesLabel, bookPages);
  hasReadBtnContainer.appendChild(hasReadBookBtn);
  removeBookBtnContainer.appendChild(removeBookBtn);

  hasReadBookBtn.addEventListener("click", () => {
    updateReadStatus(book, hasReadBookBtn);
  });

  removeBookBtn.addEventListener("click", () => {
    removeBookCard(myLibrary, bookCard);
  });
}

function bookAlreadyExists(newBook, existingBookTitle, currentBookTitle) {
  const bookWarning = document.querySelector(".book-exists-warning");

  if (!existingBookTitle.includes(currentBookTitle)) {
    myLibrary.push(newBook);
    createBookCard(newBook);
    displayOrHidePromptBox();
    bookWarning.classList.remove("visible");
  } else {
    bookWarning.classList.toggle("visible");
  }
}

function addBookToLibrary() {
  const newBook = new Book();
  const currentBookTitle = retrieveFormInput("title").value;

  // We make sure that the book's title isn't already in the library.
  const alreadyExistingBooks = myLibrary.map((book) => book.title);

  bookAlreadyExists(newBook, alreadyExistingBooks, currentBookTitle);
}

const addBookBtn = document
  .querySelector("#book-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
  });

const newBookPrompt = document
  .querySelector(".header__new-book")
  .addEventListener("click", () => {
    document.querySelector("form").reset();
    displayOrHidePromptBox();
    retrieveFormInput("title").focus();
  });

// Remove the prompt from the DOM when clicking the prompt's background.
promptBg.addEventListener("click", displayOrHidePromptBox);
