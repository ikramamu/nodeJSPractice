const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("./db");

const bookRouter = require("./routes/books");
const authorRouter = require("./routes/authors");


app.use(express.json())
app.use("/book", bookRouter)
app.use("/author", authorRouter)

const port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Server is running on port${port}`);
})