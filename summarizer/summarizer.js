const path = require('path');
const { spawn } = require('node:child_process');
const { fs } = require('fs');

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
 * @param {string} raw_text - the text to be processed, for MVP0, this is expected to be a Japanese contract document
 * @return {Promise} - resolve to the preprocessed text
 */
async function preprocess_text(raw_text) {
  // Call the scritp

  const peg_rubyArgs = [
                    path.join(__dirname, '../serverless/contract-peg-parser-ruby/main.rb')
                  ];

  const addFlagArgs = [
    path.join(__dirname, '../serverless/make_newjson.py')
    // path.join(__dirname, '../serverless/preprocess.py')
  ]

  // const preprocessWorker = spawn('python3', args);
  const peg_process = spawn('ruby', peg_rubyArgs);
  const addFlag_process = spawn('python3', addFlagArgs);

  return new Promise((resolve, reject) => {
    var res = [];

    // On outcoming data, Caching preprocess result
    peg_process.stdout.setEncoding('utf8');
    peg_process.stdout.on('data', (data) => {
      res.push(data);
      console.log(`Appending preprocessed result(peg): ${data.slice(0, 20)}\n`);
    });

    // On error, call reject
    peg_process.stderr.setEncoding('utf8');
    peg_process.stderr.on('data', (err) => {
        reject(err)
        console.error(`Preprocess error(peg): ${err}`);
    })

    // When PEG parser exit, pass it to addFlag for further process
    peg_process.on('exit', (code) => {
        const result = res.join('');
        res = [];
        if (code != 0) {
          console.log(`ruby peg parser exited with code ${code}`);
        } 

        console.log(`PEG parser terminates as expected :)\nResult:\n${result.slice(0, 50)}`);

        // Pass parsed contract to addFlag for highlight marking
        addFlag_process.stdin.setEncoding('utf8');
        addFlag_process.stdin.write(result); // Expects to be valid JSON
        addFlag_process.stdin.end();
    })

    // On outcoming data, Caching preprocess result
    addFlag_process.stdout.on('data', (data) => {
      res.push(data);
      console.log(`Appending preprocessed result(addFlag): ${data.slice(0, 20)}\n`);
    })

    // On error, call reject
    peg_process.stderr.setEncoding('utf8');
    addFlag_process.stderr.on('data', (err) => {
      reject(err)
      console.error(`Preprocess error(addFlag): ${err}`);
  })

    // call resolve
    addFlag_process.on('exit', (code) => {
      const result = res.join('');
      if (code != 0) {
        console.log(`make_newjson.py exited with code ${code}`);
      } else {
        console.log(`Flags have been added :)`);
        console.log(`Preprocessing terminates successfully :)\nResult:\n${result}`);
        resolve(result)
      }
    })

    ///////////////////////////////////////////////////////////
    // pipe <raw_text> from stdin to peg parser for preprocess
    peg_process.stdin.setEncoding('utf8');
    peg_process.stdin.write(raw_text);
    peg_process.stdin.end();

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

async function addFlag(flagged) {
  const pyargs = [
    path.join(__dirname, '../serverless/make_newjson.py')
  ]
  // const toJSON = JSON.stringify(result);
  //       console.log(toJSON)
  //       fs.writeFileSync('../serverless/rubyoutput.json', toJSON, 'utf-8', (err) => {
  //         if (err) throw (err);
  //         if (!err) {
  //           console.log('Json created.')
  //         }
  //       })

  spawn('python3', pyargs);
}


module.exports = {
  preprocess_text,
  summarize,
}