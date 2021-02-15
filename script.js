//DOM identifiers
const bookshelf = document.querySelector(".bookshelf"); //identifies main "bookshelf" div
const form = document.querySelector("form"); //identifies form
const submit = document.querySelector(`[type="submit"]`); //identifies submit button
const addButton = document.querySelector(`.add-shown`)
const formDiv = document.querySelector(`.add-form-hidden`);
const formInput = document.querySelector(`[name="title"]`);

//empty array for book objects
const library = [];

//object constructor for the book object
function Book(title, author, pages, read, comments, id) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.comments = comments
	this.id = id
};

//prototype info-fetching function
Book.prototype.info = function () {
	return this.title + " by " + this.author + " <br>(" + this.pages + " pages)";
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
		let id = (Math.max.apply(Math, library.map(highest => { return highest.id })) + 1);
		let newBook = new Book(title, author, pages, read, comments, id); //store the book const
		library.push(newBook); //add the library object to the end of the library array
	}
	return;
}

//delete book row div
function delDiv(bookID) {
	let delDiv = document.createElement("div"); //create 'delete div' and store it
	delDiv.setAttribute('class', 'delete-div'); //style div with generic class for css
	delDiv.setAttribute(`data-id`, `${bookID}`); //set data attribute for access functionality
	const delText = document.createTextNode("✖"); //create text placeholder to act as delete key
	delDiv.appendChild(delText); //insert text placeholder into new div
	return delDiv; //return the 'delete div' for use out of the function
}

//function to create book DIV and style it
function bookDiv(bookID) {
	let div = document.createElement("div"); //create div and store it 
	div.setAttribute('class', 'book'); //style div with generic class for css
	div.setAttribute(`data-index`, `${bookID}`); //set data attribute for access functionality
	return div; //return the div for use outside of the function
}

//function to create read tick box, initiatied by the updateLibrary function
function tickRead(read, bookID) {
	let tickDiv = document.createElement("div"); //create 'tick div' and store it
	tickDiv.setAttribute('class', 'read-div'); //set class for styling
	if (read == "read") { //validate whether object is read or not
		tickDiv.innerHTML = `<input type="checkbox" class="read" data-read="${bookID}" name="read" checked>
	<label for="read">read?</label>`;//set HTML appropriately
	}
	else { //otherwise if book is unread
		tickDiv.innerHTML = `<input type="checkbox" class="read" data-read="${bookID}" name="read">
	<label for="read">read?</label>`; //set HTML appropriately
	}
	return tickDiv; //return tickDiv to updateLibrary function
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
	let bookID = library[i].id //store Object's booktitle
	let div = bookDiv(bookID); //run bookDiv function and store its output
	let del = delDiv(bookID); //run delDiv function and store its output
	div.innerHTML = `<div>${library[i].info()}</div>`  //title + " " + library[i].author + " " + library[i].pages + " " + library[i].read; //output object values into HTML of the div
	let read = library[i].read; //store the value of whether the book is read or not
	let tickDiv = tickRead(read, bookID); //run the tickbox creation function using the read variable
	div.appendChild(tickDiv); //add the tick read div as a child of the Book's detail's div
	div.appendChild(del); //add the delete div as a child of the Book's detail's div.
	bookshelf.appendChild(div); //add the Book's Detail's div to the bookshelf div.
	return;
}

//function to parse form input fields into object constructor
function getInput() {
	//obtain form input values and assign them to variables:
	let titleInput = document.querySelector(`[name="title"]`).value;
	let authorInput = document.querySelector(`[name="author"]`).value;
	//validate author/title input and prevent function running if either are empty:
	if ((titleInput == "") || (authorInput == "")) {
		return;
	}
	//back to obtaining the remaining form input values
	let pagesInput = document.querySelector(`[name="pages"]`).value;
	let commentsInput = document.querySelector(`[name="comments"]`).value;
	let readInput = document.querySelector('input[name="read"]:checked').value;
	//parse variables to add function:    
	addBookToLibrary(titleInput, authorInput, pagesInput, readInput, commentsInput);
	let i = (library.length - 1)//set i to the index value of the latest library object
	updateLibrary(i); //run library update using i
	populateStorage();
	return;
}

//event listener for the submit button
submit.addEventListener('click', (e) => {
	e.preventDefault(); //prevent the form submit button from refreshing
	getInput(); //run the getInput()_function
	form.reset(); //reset the form
	return;
});

//DOM identifier for delte divs
let deleteButton = document.querySelectorAll(".delete-div");

//event listeners for X and changeRead functions
bookshelf.onclick = function (e) {
	if (e.target.className == "read") { //check to see if read has been pressed
		changeRead(e.target.attributes["data-read"].value); //take the ID value from the tickbox and parse it to the change read status function
		populateStorage();
	}
	else if (e.target.className == "delete-div") { //check to see if "X" is being pressed
		let removeBook = e.target.closest('.book'); //find and assign the parent book DIV it belongs to
		removeBook.remove(); //then remove it from the DOM
		deleteBook(e.target.attributes[1].value); //take the ID value from the X div and parse it to the delete book from array function
		populateStorage();
	}
	else return; //otherwise do nothing
};

//changes the colour of the book div to red on hovering on the delete button
bookshelf.onmouseover = function (e) {
	if (e.target.className == "delete-div") {
		let removeBook = e.target.closest('.book'); //find and assign the parent book DIV it belongs to
		removeBook.setAttribute('class', 'book-delete'); //then remove it from the DOM
	}
	else return;
}

bookshelf.onmouseout = function (e) {
	if (e.target.className == "delete-div") {
		let removeBook = e.target.closest('.book-delete'); //find and assign the parent book DIV it belongs to
		removeBook.setAttribute('class', 'book'); //then remove it from the DOM
	}
	else return;
};

//click listener for add button being pressed
addButton.onclick = function () {
	addButton.classList.add("add-hidden");
	addButton.classList.remove("add-shown") //hide + button
	formDiv.classList.remove("add-form-hidden");
	formDiv.classList.add("add-form-shown");
	formInput.focus();
	formInput.select();
}

//change status of read
function changeRead(e) {
	let toChangeRead = library.findIndex(({ id }) => id == e) //finds the index of the id clicked on
	if (library[toChangeRead].read == "read") { //if the book object is read
		library[toChangeRead].read = "unread" //change it to unread
	}
	else if (library[toChangeRead].read == "unread") { //if the book object is unread
		library[toChangeRead].read = "read" //change it to read
	}
}

//function to delete object from array
function deleteBook(e) {
	let toDelete = library.findIndex(({ id }) => id == e); //finds the index of the id clicked on
	library.splice(toDelete, 1); //delete the object at the found index
	let divToDel = document.querySelector(`[data-index="${e}"]`) //finds the parent div in the HTML	
}

function storageCheck() {
	if (!localStorage.getItem('library')) { //if local storage does not exist
		populateStorage(); //save initial storage
	} else { //otherwise...
		retrieveStorage();
		displayLibrary();
	}
}

//save to storage 
function populateStorage() {
	localStorage.setItem('library', JSON.stringify(library));
	return;
}

//retreive from local storage
function retrieveStorage() {
	let retrievedStorage = localStorage.getItem('library'); //parse stored JSON to variable
	let bookObj = JSON.parse(retrievedStorage)
	for (let i = 0; i < bookObj.length; i++) {
		addBookToLibrary(bookObj[i].title, bookObj[i].author, bookObj[i].pages, bookObj[i].read, bookObj[i].comments)
	}
}

storageCheck();