const mongoose = require('mongoose')

const cover_image_base_path = 'uploads/cover_images'

const book_schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Author"
    },
    publish_date : {
        type : Date,
        required : true
    },
    created_at : {
        type : Date,
        required: true,
        default : Date.now
    },
    page_count : {
        type : Number,
        required : true
    },
    cover_image_name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Book', book_schema)
module.exports.cover_image_base_path = cover_image_base_path