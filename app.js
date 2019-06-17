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
    image: {type: String, default: 'https://via.placeholder.com/728x90.png?text=Placeholder+Photo'},
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

//index
app.get('/', (req, res) => {
    res.redirect('/blogs')
});
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            res.send('Error getting blog posts, press refresh or go back');
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});
//title

//imageurl

//body

//created
app.listen(3000, () => {
    console.log('Listening on PORT 3000')
});