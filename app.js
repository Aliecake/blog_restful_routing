const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/restful_blog', {useNewUrlParser: true});

const blogSchema = new mongoose.Schema ({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

//RESTFUL ROUTES

//index

app.get('/', (req, res) => {
    res.send('Landing Page')
});
app.get('/blogs', (req, res) => {
    res.render('index')
})
//title

//imageurl

//body

//created
app.listen(3000, () => {
    console.log('Listening on PORT 3000')
});