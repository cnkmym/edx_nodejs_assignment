const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const comments = require('./routes/comments.js');
const posts = require('./routes/posts.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorHandler());

let store = {
  posts: [
    //  {
    // name: 'Top 10 ES6 Features every Web Developer must know',
    // url: 'https://webapplog.com/es6',
    // text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    // comments: [
    //   'Cruel…..var { house, mouse} = No type optimization at all',
    //   'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
    //   '(p1,p2)=>{ … } ,i understand this ,thank you !'
    // ]
    //}
  ]
};

// Link in-memory storage to each module
comments.setStorage(store.posts);
posts.setStorage(store.posts);

// Define posts related route
app.get('/posts', posts.getPosts);
app.post('/posts', posts.addPost);
app.put('/posts/:postId', posts.updatePost);
app.delete('/posts/:postId', posts.removePost);

// Define comments related route
app.get('/posts/:postId/comments', comments.getComments);
app.post('/posts/:postId/comments', comments.addComment);
app.put('/posts/:postId/comments/:commentId', comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', comments.removeComment);

// Initialized Listening port
app.listen(3000);
