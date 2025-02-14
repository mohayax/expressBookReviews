const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: 'muhd', password: 'muhd' },
];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  if (users.filter(user => user.username === username).length > 0) {
    return false;
  } else {
    return true;
  }
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      return true;
    }
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  const validUser = authenticatedUser(username, password);

  if (!validUser) {
    return res.status(300).json({ message: "Invalid username or password" });
  }
  const userForToken = {
    username: username,
  }
  const token = jwt.sign(userForToken, 'fingerprint_customer');

  req.session.username = username;

  return res.status(300).json({ token: `Bearer ${token}`, username, password });

});
// Add a book review

regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { isbn } = req.params;
  const reviewData = {
    isbn: isbn,
    comment: req.body.comment
  };
  let bookFound = false;
  for (let bookId in books) {
    const book = books[bookId];
    if (book.reviews && book.reviews.isbn === isbn) {
      book.reviews.data = reviewData;
      return res.status(300).json({
        message: `Added "${req.body.comment}" review to "${book.title}" by ${book.author}` });
        bookFound = true;
        break;
      }
}
  if (!bookFound) {

    return res.status(300).json({ message: "book not found" });
  }
  return res.status(300).json({ message: "review added successfully" });
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;

  let bookFound = false;
  for (const [key, book] of Object.entries(books)) {
    if (book.reviews && book.reviews.isbn === isbn) {

      delete books[key];
    return res.status(300).json({ message: "book deleted successfully" });
    bookFound = true;
    break;
  }
}
if (!bookFound) {
  return res.status(300).json({ message: "book not found" });

}
})
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;

module.exports.users = users;