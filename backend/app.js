const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

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
