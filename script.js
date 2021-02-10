//DOM identifiers
const bookshelf = document.querySelector(".bookshelf"); //identifies main "bookshelf" div
const form = document.querySelector(`form`) //identifies form
const submit = document.querySelector(`[type="submit"]`); //identifies submit button
const deleteButton = document.querySelectorAll(".delete-div");


//empty array for book objects
const library = [
];

//object constructor for the book object
function Book(title, author, pages, read, comments, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.comments = comments
    this.id = id
};
//prototype info fetching function
Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages long - " + this.read;
};

//function to add book to library based on user inputs
function addBookToLibrary(title, author, pages, read, comments) {
    if (library.length < 1) { //check to see whether library object array is empty
        let id = 1; //if so, set the object's ID to 1
        let newBook = new Book(title, author, pages, read, comments, id); /*store the new book
        constructor in a variable*/
        library.push(newBook); //add the library object to the end of the library array
    }
    else {
        /*if the library array is not empty, find the highest value ID and add 1 to it 
        to set the id for the newly added object*/
        let id = (Math.max.apply(Math, library.map(highest => {return highest.id})) + 1);
        let newBook = new Book(title, author, pages, read, comments, id); //store the book const
        library.push(newBook); //add the library object to the end of the library array
    }    
    return;
}


//populate object array
addBookToLibrary("book1", "author1", 101, "read", "great book");
addBookToLibrary("book2", "author2", 102, "unread", "recommended by Judy");
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

//loop through library object and runs the update library function
function displayLibrary() {
    for (let i = 0; i < library.length; i++) { //cycle through object array length
        updateLibrary(i); //run the update library function for each instance of i
    };
    return;
}

//update library display
function updateLibrary(i) {
    let bookTitle = library[i].title //store Object's booktitle
    let div = bookDiv(bookTitle); //run bookDiv function and store its output
    let del = delDiv(bookTitle); //run delDiv function and store its output
    div.innerHTML = library[i].info()  //title + " " + library[i].author + " " + library[i].pages + " " + library[i].read; //output object values into HTML of the div
    div.appendChild(del); //add the delete div as a child of the Book's detail's div.
    bookshelf.appendChild(div); //add the Book's Detail's div to the bookshelf div.
    return;
}

//function to parse form input fields into object constructor
function getInput() {
    //obtain form input values and assign them to variables
    let titleInput = document.querySelector(`[name="title"]`).value;
    let authorInput = document.querySelector(`[name="author"]`).value;
    //validate author/title input and prevent function running if either are empty
    if ((titleInput == "") || (authorInput == "")) {
        return;
    }
    let pagesInput = document.querySelector(`[name="pages"]`).value;
    let commentsInput = document.querySelector(`[name="comments"]`).value;
    let readInput = document.querySelector('input[name="read"]:checked').value;
    //parse variables to add function:    
    addBookToLibrary(titleInput, authorInput, pagesInput, readInput, commentsInput);
    let i = (library.length - 1)//set i to the index value of the latest library object
    updateLibrary(i); //run library update using i
    return;
}

//event listener for the submit button
submit.addEventListener('click', (e) => {
    e.preventDefault();
    getInput();
    //form.reset();
});

