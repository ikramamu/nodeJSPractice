const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    name: String,
    contact: String,
    genre: String
})

module.exports = mongoose.model("Author", authorSchema)