// var http = require('http');
// var fs = require('fs');

// http.createServer((req, res) => {

//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     if(req.url == "/")
//     {
//         res.end("<h1>Welcome in Home page...</h1>");
//     }

//     else if(req.url == "/pr2")
//     {
//         fs.readFile('./pr2.html', (err, data) => {

//             if(err)
//                 throw err;

//             res.end(data);
//         });
//     }

//     else if(req.url == "/pr9")
//     {
//         fs.readFile('./pr9.html', (err, data) => {

//             if(err)
//                 throw err;

//             res.end(data);
//         });
//     }

//     else
//     {
//         res.end("Page not found");
//     }

// }).listen(8081);

// console.log("Server running on port 8081");


// Express.js

// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//     res.send("Welcome in home");
// });

// app.get('/pr2', (req, res) => {
//     res.sendFile(__dirname + '/pr2.html');
// });

// app.listen(5050, () => {
//     console.log("Server running on port 5050");
// });


const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.listen(8081, () => {
    console.log('Server running on http://localhost:8081');
});