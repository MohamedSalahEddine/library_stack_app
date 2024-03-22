const express = require('express')
const author_router = express.Router()
const Author = require('../models/author')

author_router.get('/', async (req, res) =>{
    let searchOption = {}
    if(req.query.name != null && req.query.name != ""){
        searchOption.name = new RegExp(req.query.name,'i') 
        // searchOption.name = req.query.name
    }
    try{
        const authors = await Author.find(searchOption)
        res.render('authors/index', {authors: authors})
        
    }catch(err){
        res.render("authors")
    }
    
})
author_router.get('/new', (req, res) =>{
    // res.render('authors/new')
    res.render('authors/new', {author : new Author()})
})


author_router.post('/', (req, res) =>{
    const author = new Author({
        name : req.body.name
    })

    // MongooseError: Model.prototype.save() no longer accepts a callback

    // author.save((err, newAuthor) =>{
    //     if(err) {
    //         res.render('/authors/new', {
    //             author : author,
    //             error_message: "a problem has orrcured whilst saving the author" 
    //         })
    //     }else{
    //         res.redirect('/authors')
    //     }
    // })
    

    // for forcing the function to execute the catch bloc (for testing purposes)
    // author.save = function (){
    //     return Promise.reject(new Error("wronnnng"))
    // }


    author.save()
      .then(newAuthor=>{
        res.redirect('/authors')
      })
      .catch(err =>{
        res.render('authors/new', {
            error_message : "a problem has occured when saving the author",
            author: author
        })
      })
})

module.exports = author_router
