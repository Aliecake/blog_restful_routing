const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/restful_blog', {useNewUrlParser: true});

const blogSchema = new mongoose.Schema ({
    title: String,
    image: {type: String, default: '/images/350.png'},
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);


//index
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
//blog posts
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            res.send('Error getting blog posts, press refresh or go back');
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});
//new route
app.get('/blogs/new', (req, res) => {
    res.render('new');
});
//create route
app.post('/blogs', (req, res) => {
    Blog.create({
        title: req.body.blog.title,
        image: req.body.blog.image,
        body: req.body.blog.body
    }, (err, blog) => {
        if(err){
            res.send('There was an error posting, go back and try again')
        } else {
            console.log("Added a new blog post", blog);
        }
    });
    res.redirect('/blogs')
});

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});