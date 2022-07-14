const http = require('http');
const path = require('path');
const express = require('express');

const log = console.log;
const { preprocess_text, summarize} = require('./summarizer/summarizer');

const app = express();
const PORT = process.env.PORT || 4321;


// middlewares
app.use(express.json()); // parse incoming json message
app.use(express.static(path.join(__dirname, '/public'))); //serve static assets
// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


app.post('/post', (req, res) => {
  const {contractType, contractText} = req.body;

  /* Ignore <contractType> for prototyping purpose */
  preprocess_text(contractText)
  .then( // Mock preprocess text
    preprocessed => summarize(preprocessed)
  )
  .then (summarized => {
    log(summarized);
    res.json(summarized)
  })
  .catch(err => {
    log(err)
  })
})


app.listen(PORT, () => { console.log(`Server is up and running. Access: http://localhost:${PORT}`); });
