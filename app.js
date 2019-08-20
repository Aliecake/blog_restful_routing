const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/restful_blog', {useNewUrlParser: true});

const blogSchema = new mongoose.Schema ({
    title: String,
    image: String,
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
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, blog) => {
        if(err){
            res.send(`There was an error posting, return to <a href="/blogs/new">Form</a> or <a href="/">Home</a>`)
        } else {
            console.log("Added a new blog post", blog);
        }
    });
    res.redirect('/blogs');
});
//show route
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id, (err, blog) => {
        if(err){
            res.send(`There was an error finding that post, return <a href="/">Home</a>`);
        } else {
            res.render('show', {blog: blog});
        }
    });
});
//edit route
app.get('/blogs/:id/edit', (req, res) => {
    const id = req.params.id;
    Blog.findById(id, (err, blog) => {
        if(err) {
            res.send(`There was an error finding that post, return <a href="/">Home</a>`);
        } else {
            res.render('edit', {blog: blog});
        }
    });
});
//update route
app.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err){
            res.send(`There was an error updating that post, return <a href="/">Home</a>`);
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});
//delete route
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.send(`There was an error deleting that post, return <a href="/">Home</a>`);
        } else {
            res.redirect(`/blogs`);
        }
    });
});

app.get('*', (req, res) => {
    res.send(`Error 404 : Page Not found. Go back <a href="/">Home</a>`)
});
app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});