const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')
const multer = require('multer')
const fs = require('fs')
const image_mime_types = ['image/jpeg','image/png','image/gif']
const path = require('path')
const upload_path = path.join('public', Book.cover_image_base_path)

const book_router = express.Router()

const upload = multer({
    dest : upload_path,
    fileFilter : (req, file, callback) =>{
        callback(null, image_mime_types.includes(file.mimetype))
    }
})

book_router.get('/', async (req, res)=>{
    try{
        const books = await Book.find({})
        // res.render('books/index', {books})
        res.render('books/index', {books})
    }catch{

    }
    
})
book_router.get('/new', async (req, res)=>{
    renderNewPage(res, new Book({}))
})

book_router.post("/", upload.single('cover'), async (req, res)=>{
    const file_name = req.file != null ? req.file.filename : null
    // console.log(req.file)
    const book = new Book({
        title : req.body.title,
        author : req.body.author,
        publish_date : new Date(req.body.publish_day),
        page_count : req.body.page_count,
        description : req.body.description, 
        cover_image_name : file_name
    })
    // console.log(book)
    try{
        const newBook = await book.save()
        res.redirect('books/')
        
    }catch{
        if(book.cover_image_name != null ){
            removeCover(book.cover_image_name)

        }
        renderNewPage(res, book, true)
    }
})

async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({})
        const params = {
            authors,
            book
        }
        if(hasError) params.errorMessage = "an error has occured"
        res.render('books/new', params)
    }catch{
        res.redirect('/books')
    }
}

function removeCover(filename){
    fs.unlink(path.join(upload_path, filename), err =>{
        if(err) console.log(err)
    })
}

module.exports = book_router