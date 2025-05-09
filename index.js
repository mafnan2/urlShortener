require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
let urlDatabase = {}
let idCounter = 1

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

function isValidURL(url) {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

app.post('/api/shorturl', function (req, res) {
  const url = req.body.url

  if (!isValidURL(url)) {
    return res.status(400).json({ error: 'invalid url' })
  }
  let shorturl = idCounter++
  urlDatabase[shorturl] = url

  res.status(200).json({ original_url: url, short_url: shorturl })
})

app.get('/api/shorturl/:shorturl', function (req, res) {
  if (original_url) {
    res.redirect(original_url);
  } else {
    res.json({ error: 'No short URL found for given input' });
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
