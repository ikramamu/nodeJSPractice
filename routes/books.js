const express = require("express");
const router = express.Router();
const Book = require("../models/book");

//JOI VALIDATOR
const Joi = require("joi");
const bookSchema = Joi.object({
    name: Joi.string().required(),
    author_name: Joi.string().required(),
    publication_year: Joi.number().integer().required(),
    language: Joi.string().required()
})

//MIDDLEWARE FUNCTION TO VALIDATE WITH JOI
const validateBook = (req,res, next)=>{
    const {error} = bookSchema.validate(req.body);

    if(error){
        const errorMessage = error.details.map(detail=> detail.message).join(', ');
        return res.status(400).json({error: errorMessage });
    }

    next();
};

//CRUDE OPERATIONS

//GET ALL BOOKS
router.get("/", async (req,res)=>{
    try{
        const books = await Book.find().exec();// to return a promise
        res.json(books)
    } catch(err){
        res.status(500).json({error: "Error retrieving books"})

    }  
});

//GET by ID
router.get("/:id", async (req,res)=>{
    const bookId = req.params.id;
    //console.log(bookId)
    try{
        const book = await Book.findById(bookId).exec();// to return a promise
        console.log(book);
        if(!book){
            return res.status(404).json({error:"No book by that Id"})
        }
        res.json(book)
    } catch(error){
        res.status(500).json({error: "Error retrieving books"})

    }  
});

//CREATE A NEW BOOK ENTRY WITH POST OPERATIONS

router.post("/", validateBook, (req, res)=>{
    const newBook = new Book(req.body);
    newBook.save().then(book=>res.json(Book))
    .catch(err =>res.status(400).json({error: err.message}));

});

//DELETE OPERATION

router.delete("/:id", async(req, res)=>{
    const bookId = req.params.id;
    try{
        const deletedBook = await Book.findByIdAndRemove(bookId);
        if(!deletedBook){
            return res.status(404).json({error:"Book not found"});
        }
        res.json({message: "Book deleted successfully"})
    }catch(error){
        res.status(500).json({error:"Error deleting book"})
    }
});

module.exports = router;
