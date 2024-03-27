const express = require('express')
const app = express()


// db
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/My_library')
const conn = mongoose.connection
conn.on('error', error => console.log(error))
conn.once('open', () => console.log('connected to mongoose')) 

const express_ejs_layouts = require('express-ejs-layouts')
const body_parser = require('body-parser')

const index_router = require('./routes/index_router')
const author_router = require('./routes/author_router')
const book_router = require('./routes/book_router')


app.set('view engine', "ejs") 
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout') 
app.use(express_ejs_layouts)
app.use(express.static('public')) 
app.use(body_parser.urlencoded({limit : '10mb', extended : false}))

app.use("/", index_router)
app.use("/authors", author_router)
app.use('/books', book_router)

app.listen(3000)