const express = require("express");
const router = express.Router();
const Author = require("../models/author");


router.get("/", async (req,res)=>{
    try{
        const authors = await Author.find().exec();// to return a promise
        res.json(authors)
    } catch(err){
        res.status(500).json({error: "Error retrieving authors"})

    }  
});

module.exports = router ;