const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'sdfsrr324',
      title: 'First post',
      content: 'Content from BE first',
    },
    {
      id: 'gh2rrd325',
      title: 'Second post',
      content: 'Content from BE second',
    },
  ];

  res.status(200).json({
    message: 'Posts fethced succesfully!',
    posts,
  });
});

module.exports = app;
