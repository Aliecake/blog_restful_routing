const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/blogrest', {useNewUrlParser: true});


//title

//imageurl

//body

//created