const eventEmitter = require("../utils/eventEmitter");
const Book = require("../models/Book");

exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;

        const newBook = await Book.create({ title, author, isbn, publishedDate });
        
       
        eventEmitter.emit('bookAdded', newBook._id);

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
