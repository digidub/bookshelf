//array for book objects
const library = [
    {
        "title": "book1",
        "author": "author1",
        "pages": 101,
        "read": 1,
    },
    {
        "title": "book2",
        "author": "author2",
        "pages": 202,
        "read": 1,
    },
    {
        "title": "book3",
        "author": "author3",
        "pages": 303,
        "read": 1,
    },
];

//object constructor for the book object
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return (`${title} by ${author}, ${pages}, ${read}`);
    }
}

