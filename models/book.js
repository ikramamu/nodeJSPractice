const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name: String,
    author_name: String,
    publication_year: Number,
    language: String
})

module.exports = mongoose.model("Book", bookSchema)