const express = require('express')
const app = express()

const express_ejs_layouts = require('express-ejs-layouts')

const index_router = require('./routes/index_router')

app.set('view engine', "ejs")
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(express_ejs_layouts)
app.use(express.static('public'))

app.use("/", index_router)

app.listen(3000)