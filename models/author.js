const mongoose = require('mongoose')

const author_schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Author', author_schema)