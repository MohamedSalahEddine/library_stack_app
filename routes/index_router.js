const express = require('express')
const router = express.Router()

// All authors route
router.get('/', (req, res)=>{
    res.render('index')
})


// new author route
router.get('/new', (req, res)=>{
    res.render('authors/new')
})


// create new autor
router.post('/', (req, res)=>{
    res.send('creating new author done')
})

module.exports = router