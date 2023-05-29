const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(409).json({message: "User already exists!"});    
    }
  } 
  return res.status(400).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let booksLen = Object.keys(books).length;
  let isbn = req.params.isbn;
  if(isbn <= 0 || isbn > booksLen) return res.status(400).json({message: "index out of bounds"})
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let booksLen = Object.keys(books).length;
  let author = req.params.author;
  for(i = 1; i <= booksLen; i++){
      if(books[i].author.toString().replace(/\s/g, "").toLowerCase() == author.toString().replace(/\s/g, "").toLowerCase()) return res.status(200).json(books[i]);
  }
  return res.status(404).json({message: "Book not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let booksLen = Object.keys(books).length;
  let title = req.params.title;
  for(i = 1; i <= booksLen; i++){
      if(books[i].title.toString().replace(/\s/g, "").toLowerCase() == title.toString().replace(/\s/g, "").toLowerCase()) return res.status(200).json(books[i]);
  }
  return res.status(404).json({message: "Book not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let booksLen = Object.keys(books).length;
  let isbn = req.params.isbn;
  if(isbn <= 0 || isbn > booksLen) return res.status(400).json({message: "index out of bounds"})
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
