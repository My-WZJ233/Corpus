var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules/', express.static('./node_modules'))
// app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended:false }))

app.use(bodyParser.json())

app.use(router)

app.listen(3000,function(){
    console.log('run   -> http://127.0.0.1:3000/')
    console.log('login -> http://127.0.0.1:3000/Corpus/login')
    console.log('root  -> http://127.0.0.1:3000/Corpus')
    console.log('user  -> http://127.0.0.1:3000/CorpusUser')
})

module.exports = app
