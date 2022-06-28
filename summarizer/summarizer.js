const path = require('path');
const { spawn } = require('node:child_process');

const log = console.log;

/**
 * Preprocess text with another python subprocess, and do something with 
 * <stdout>. 
 * 
 * Note:
 * This function is for development purpose. In deployed version of the 
 * application, the same function is expected to be implemented using 
 * serverless services(e.g. a call to AWS Lambda URL), which returns a Promise, 
 * and the callback function will be executed in a .then() clause.
 * 
 * @param {string} text - the text to be processed, for MVP0, this is expected to be a Japanese contract document
 * @return {Promise} - resolve to preprocessed text
 */
async function preprocess_text(raw_text) {
  // Call the scritp
  const args = [
    path.join(__dirname, '../serverless/preprocess.py')
  ]

  const preprocessWorker = spawn('python', args);

  return new Promise((resolve, reject) => {
    var res = [];

    // On outcoming data, Caching preprocess result
    preprocessWorker.stdout.setEncoding('utf8');
    preprocessWorker.stdout.on('data', (data) => {
      res.push(data);
      console.log(`Appending preprocessed result: ${data}\n`);
    });

    // On error, call reject
    preprocessWorker.stderr.setEncoding('utf8');
    preprocessWorker.stderr.on('data', (err) => {
        reject(err)
        console.error(`Preprocess error: ${err}`);
    })

    // On exit, call resolve
    preprocessWorker.on('exit', () => {
        const result = res.join('');
        console.log(`Preprocessing terminates successfully :)\nResult:\n${result}`);
        resolve(result)
    })

    // pipe in <raw_text> for preprocess
    preprocessWorker.stdin.setEncoding('utf8');
    preprocessWorker.stdin.write(raw_text);
    preprocessWorker.stdin.end();
  })   
}


/**
 * @param {Object} summarized
 * @return {Promise} - resolve to summarized text
 */
async function summarize(preprocessed) {
  var summarized = preprocessed;
  return new Promise((resolve, reject) => {
    // Mock API summarize latency
    setInterval( () => {
      resolve(JSON.stringify({ summarized }));
    }, 1000)   
  })
}

module.exports = {
  preprocess_text,
  summarize,
}