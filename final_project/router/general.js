const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const body = req.body;
  const isValidUsername = isValid(body.username);
  if (isValidUsername) {
    users.push(body);
    return res.status(300).json({ message: "User created successfully" });
  } else {
    res.status(300).json({ message: "Username or Password alredy exist!" });
  }
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  try {
    const bookList = await Promise.resolve(books);
    return res.status(300).json(({ books }));
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    const { isbn } = req.params;
    const book = await Prmoise.resolve(Object.values(books).filter(book => book.reviews.isbn === isbn)) 
if (!book) {
      res.status(404).send('Book not found');
      return;
    }
    res.status(300).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  try {
    const { author } = req.params;
    const result = await Promise.resolve(Object.values(books).filter(book => book.author === author));
if (!result) {
      res.status(404).send('Author not found');
      return;
    }
    res.status(300).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// Get all books based on title

public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  try {
    const { title } = req.params;
    const result = await Promise.resolve(Object.values(books).filter(book => book.title === title));
    if (!result) {
      res.status(404).send('Title not found');
      return;
    }
    res.status(300).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
//  Get book review

public_users.get('/review/:isbn', async function (req, res) {
  //Write your code here

  const { isbn } = req.params;
  const result = await Promise.resolve(Object.values(books).filter(book => book.reviews.isbn === isbn));
return res.status(300).json({ message: result });
});
module.exports.general = public_users;