const express = require('express');

const app = express();

app.get('/fastadd/:number', (req, res) => {
  res.json(parseInt(req.params.number, 10) * 2);
});

app.get('/slowadd/:number', (req, res) => {
  setTimeout(() => {
    res.json(parseInt(req.params.number, 10) * 2);
  }, 1000);
});


const port = 9999;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listen on port ' + port);
  }
});
