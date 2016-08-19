const express = require('express');

const app = express();

app.get('/fastadd/:number', (req, res) => {
  res.json(parseInt(req.params.number, 10) * 2);
});

app.get('/slowadd/:number', (req, res) => {
  console.log('Starting Complicated Calculation Wait.....')
  setTimeout(() => {
    const result = parseInt(req.params.number, 10) * 2
    console.log('Calculation Done', result)
    res.json(result);
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
