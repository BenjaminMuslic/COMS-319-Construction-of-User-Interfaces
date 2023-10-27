const http = require('http');
const { url } = require('inspector');
const fs = require("fs").promises;
const host = "localhost";
const port = 5000;
const server = http.createServer((req, res) => {
    const url = req.url;
    console.log("Result :.....", url);
    if (req.url === "/home" || req.url === "/"){
        fs.readFile(__dirname + "/index.html")
        .then((contents) => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })

        .catch((err) => {
            res.writeHead(500); 
            res.end(err);
            return;
            });
    }

    else if (url === "/about"){
        fs.readFile(__dirname + "/about.html")
        .then((contents) => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })

        .catch((err) => {
            res.writeHead(500); 
            res.end(err);
            return;
            });
    }

    else {
        fs.readFile(__dirname + "/404.html")
        .then((contents) => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })

        .catch((err) => {
            res.writeHead(500); 
            res.end(err);
            return;
            });
    }
    
    // const person = {
    //     name: 'alex',
    //     email: 'alex@mail.com',
    //     job: 'software dev'
    // };

  //  res.end(JSON.stringify(person));
});
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    });


