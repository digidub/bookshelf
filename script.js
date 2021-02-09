//array for book objects
const library = [
];

//object constructor for the book object
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

Book.prototype.info = function() {
    return this.title;
};

//function to add book to library
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    return;
}

addBookToLibrary("book1", "author1", 101, 0);
addBookToLibrary("book2", "author2", 102, 1);
addBookToLibrary("book3", "author3", 103, 0);


