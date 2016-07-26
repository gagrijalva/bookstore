var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.use(bodyParser.json());

// Get home page
app.get('/', function(req, res){
    res.send('Please use /api/books or api/genre');
});

// Genres
// ------------------------------

// Get Genres
app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){       
        if(err) {
            throw err;
        }
        res.json(genres);
    });
});

// Add Genre
app.post('/api/genres', function(req, res){
    var genre = req.body;

    Genre.addGenre(genre, function(err, genre){       
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

// Update Genre
app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    var genre = req.body;

    Genre.updateGenre(id, genre, {}, function(err, genre){       
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

// Delete Genre
app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;

    Genre.deleteGenre(id, function(err, genre){       
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

// Books
// ------------------------------

// Get Books
app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){       
        if(err) {
            throw err;
        }
        res.json(books);
    });
});

// Get Book
app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){       
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

// Add Book
app.post('/api/books', function(req, res){
    var book = req.body;

    Book.addBook(book, function(err, book){       
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

// Update Book
app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;

    Book.updateBook(id, book, {}, function(err, book){       
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

//Delete Book
app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;

    Book.deleteBook(id, function(err, book){       
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000);
console.log('Running on port 3000');