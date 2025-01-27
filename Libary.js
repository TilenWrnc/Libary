const addButton = document.querySelector(".add-button");
const bookTitleInput = document.querySelector("#title");
const bookAuthorInput = document.querySelector("#author");
const bookNumOfPagesinput = document.querySelector("#num-of-pages");
const bookReadCheckboxInput = document.querySelector("#read-check");
const form = document.querySelector(".my-form");
const bookDisplay = document.querySelector(".main");
const bookTracker = document.querySelector(".book-tracker");
const booksReadTracker = document.querySelector(".books-read-tracker")


const myLibrary = [];

class Book {
    constructor(title, author, numOfPages, read) {
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.read = read;
    }
    pushToArray(newBook) {
        myLibrary.push(newBook);
    }
}

/*function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author= author;
    this.numOfPages = numOfPages;
    this.read = read;
}

Book.prototype.pushToArray = function(newBook) {
    myLibrary.push(newBook);
}*/

function addBookToLibary(title, author, numOfPages, read) {
    const newBook = new Book(title, author, numOfPages, read);
    Book.prototype.pushToArray(newBook);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    const numOfPages = bookNumOfPagesinput.value;
    let read = "NOT READ";
    if (bookReadCheckboxInput.checked) {
        read = "READ";
        bookReadCheckboxInput.checked = false;
    }
    addBookToLibary(title, author, numOfPages, read);

    bookDisplay.textContent = "";
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookNumOfPagesinput.value = "";

    let booksRead = 0;

    myLibrary.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("book-card");
        div.innerHTML = `
             <button class="remove-book">X</button>
             <p class="title-info">TITLE: ${item.title}</p>
             <p class="author-info">AUTHOR: ${item.author}</p>  
             <p class="pages-info">PAGES: ${item.numOfPages}</p>
        `;
        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
        readButton.textContent = item.read;
        div.appendChild(readButton);
        if (item.read === "READ") {
            readButton.style.backgroundColor = "lightgreen";
            booksRead += 1;
            booksReadTracker.textContent = booksRead;
            console.log(booksRead);

        } else {
            readButton.style.backgroundColor = "lightcoral";
        };
        bookDisplay.appendChild(div);

        const removeBook = div.querySelector(".remove-book");
        
        bookTracker.textContent = myLibrary.length;
        
        readButton.addEventListener("click", function() {
            if (item.read === "NOT READ") {
                readButton.style.backgroundColor = "lightgreen";
                item.read = "READ";
                booksRead += 1;
            } else {
                readButton.style.backgroundColor = "lightcoral";
                item.read = "NOT READ";
                booksRead -= 1;
            }
            readButton.textContent = item.read;
            booksReadTracker.textContent = booksRead;
        })

       removeBook.addEventListener("click", function() {
        const index = myLibrary.indexOf(item);
        myLibrary.splice(index, 1);
        div.remove();
        if (item.read === "READ") {
            booksRead -= 1;
            booksReadTracker.textContent = booksRead;
        }
        bookTracker.textContent = myLibrary.length;
       })
    })
})
