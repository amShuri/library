function Book() {
  this.title = document.querySelector("#title").value;
  this.author = document.querySelector("#author").value;
  this.genre = document.querySelector("#genre").value;
  this.read = document.querySelector("#read");
  if (this.read.checked) {
    this.read = "Read";
  } else {
    this.read = "Unread";
  }
}

const promptBox = document.querySelector(".prompt-box");
const promptBg = document.querySelector(".prompt-bg");
const addBookPrompt = document.querySelector(".header__new-book");

function showOrHidePromptBox() {
  promptBox.classList.toggle("visible");
  promptBg.classList.toggle("visible");
}
addBookPrompt.addEventListener("click", showOrHidePromptBox);
promptBg.addEventListener("click", showOrHidePromptBox);

const myLibrary = [];

function addBookToLibrary() {
  /* This entire bit of code checks whether the book
   * already exists in the library or not. If it does,
   * it stops the function. If it doesn't exist, it runs
   * the function normally and hides the prompt box.
   * I NEED TO LOOK INTO THIS CODE AND THIS APPROACH.
   * IT WAS DONE REALLY QUICKLY FOR TESTING PURPOSES.
   */
  const currentBookTitle = document.querySelector("#title");
  const existingTitles = [];

  const theTitles = function () {
    for (let i = 0; i < myLibrary.length; i += 1) {
      existingTitles.push(myLibrary[i].title);
    }
  };
  theTitles();
  // LOOK INTO IIFE AGAIN WHEN COMING BACK TO THIS CODE

  console.log(existingTitles);
  console.log(myLibrary);

  if (!existingTitles.includes(currentBookTitle.value)) {
    myLibrary.push(new Book());
    showOrHidePromptBox();
  } else {
    alert("Exists");
    return;
  }
  // END

  const bookContainer = document.querySelector(".main__container");
  const bookCard = document.createElement("div");
  bookCard.classList.add("main__book-card");
  bookContainer.appendChild(bookCard);

  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookGenre = document.createElement("p");
  const bookReadStatus = document.createElement("button");

  for (let i = 0; i < myLibrary.length; i += 1) {
    bookCard.setAttribute("data-index", i);
    bookTitle.textContent = `"${myLibrary[i].title}"`;
    bookAuthor.textContent = myLibrary[i].author;
    bookGenre.textContent = myLibrary[i].genre;
    bookReadStatus.textContent = myLibrary[i].read;
  }

  bookReadStatus.addEventListener("click", (e) => {
    if (e.target.textContent === "Read") {
      e.target.textContent = "Unread";
    } else {
      e.target.textContent = "Read";
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove";

  deleteBtn.addEventListener("click", () => {
    const bookCardIndex = bookCard.getAttribute("data-index");
    myLibrary.splice(bookCardIndex, 1);
    bookCard.remove();

    /* Re-set the data-index for the remaining bookCard(s) */
    const allBookCards = document.querySelectorAll(".main__book-card");
    for (let i = 0; i < allBookCards.length; i += 1) {
      allBookCards[i].setAttribute("data-index", i);
    }
  });

  bookCard.append(bookTitle, bookAuthor, bookGenre, bookReadStatus, deleteBtn);
}

const addBookBtn = document
  .querySelector("#book-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
  });
