//DOM identifiers
const bookshelf = document.querySelector(".bookshelf"); //identifies main "bookshelf" div
const submit = document.querySelector(`[type="submit"]`); //identifies submit button


//empty array for book objects
const library = [
];

//object constructor for the book object
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};
//prototype info fetching function
Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages long - " + this.read;
};

//function to add book to library
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    return;
}


//populate object array
addBookToLibrary("book1", "author1", 101, "read");
addBookToLibrary("book2", "author2", 102, "unread");
addBookToLibrary("book3", "author3", 103, "read");




//delete book row div
function delDiv(bookName) {
    let delDiv = document.createElement("div"); //create 'delete div' and store it
    delDiv.setAttribute('class', 'delete-div'); //style div with generic class for css
    delDiv.setAttribute(`data-delete`, `${bookName}`); //set data attribute for access functionality
    const delText = document.createTextNode("X"); //create text placeholder to act as delete key
    delDiv.appendChild(delText); //insert text placeholder into new div
    return delDiv; //return the 'delete div' for use out of the function
}

//function to create book DIV and style it
function bookDiv(bookName) {
    let div = document.createElement("div"); //create div and store it 
    div.setAttribute('class', 'book'); //style div with generic class for css
    div.setAttribute(`data-index`, `${bookName}`); //set data attribute for access functionality
    return div; //return the div for use outside of the function
}

//loop through array and display each book on the page
function displayLibrary() {
    for (let i = 0; i < library.length; i++) { //cycle through object array length
        let bookTitle = library[i][0] //store Object's booktitle
        let div = bookDiv(bookTitle); //run bookDiv function and store its output
        let del = delDiv(bookTitle); //run delDiv function and store its output
        div.innerHTML = library[i].info()  //title + " " + library[i].author + " " + library[i].pages + " " + library[i].read; //output object values into HTML of the div
        div.appendChild(del); //add the delete div as a child of the Book's detail's div.
        bookshelf.appendChild(div); //add the Book's Detail's div to the bookshelf div.
    };
    return;
}

//function to parse user input to object constructor
function getInput() {
    let titleInput = document.querySelector(`[name="title"]`).value;
    let authorInput = document.querySelector(`[name="author"]`).value;
    let pagesInput = document.querySelector(`[name="pages"]`).value;
    let commentsInput = document.querySelector(`[name="comments"]`).value;
    let readInput = document.querySelector('input[name="read"]:checked').value;
    addBookToLibrary(titleInput, authorInput, pagesInput, commentsInput, readInput)   ; 
    return;
}  