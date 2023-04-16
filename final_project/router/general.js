const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const body = req.body;
  if (users.filter(e => e.username === body.username).length > 0  ) {
    return res.status(300).json({ message: "Username or Password alredy exist!" });
  }
  users.push(body);
  return res.status(300).json({message: "User created successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).end(JSON.stringify({ books }));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const {isbn} = req.params;


  
  console.log('ISBN', isbn);
  return res.status(300).json({message: isbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const { author } = req.params;
  const result = Object.values(books).filter(book => book.author === author);
  return res.status(300).json({ message: result });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const { title } = req.params;
  const result = Object.values(books).filter(book => book.title === title);
  return res.status(300).json({message: result});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  //Write your code here
  const { isbn } = req.params;
  const result = Object.values(books).filter(book => book.reviews.isbn === isbn);
  return res.status(300).json({message: result});
});

module.exports.general = public_users;
