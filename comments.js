// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// create comments array
const comments = [
  {
    id: 1,
    username: 'todd',
    comment: 'lol that is so funny!',
  },
  {
    id: 2,
    username: 'sk8erBoi',
    comment: 'Plz delete your account, todd',
  },
  {
    id: 3,
    username: 'onlysayswoof',
    comment: 'woof woof woof',
  },
  {
    id: 4,
    username: 'davidAttenborough',
    comment: 'The spotted tree frog is native to Australia and is the largest Australian frog.',
  },
];

// GET /comments - list all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments - create a new comment
app.post('/comments', (req, res) => {
  const newComment = {
    id: Date.now(),
    username: req.body.username,
    comment: req.body.comment,
  };
  comments.push(newComment);
  res.json(newComment);
});

// GET /comments/:id - get one comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  res.json(comment);
});

// PUT /comments/:id - update one comment by id
app.put('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  comment.username = req.body.username;
  comment.comment = req.body.comment;
  res.json(comment);
});

// DELETE /comments/:id - delete one comment by id
app.delete('/comments/:id', (req, res) => {
  const commentIndex = comments.findIndex((c) => c.id === parseInt(req.params.id));
  comments.splice(commentIndex, 1);
  res.json({ msg: `Comment with id ${req.params.id} deleted` });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));