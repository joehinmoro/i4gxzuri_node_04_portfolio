// require http, fs, and path native modules
const { createServer } = require("http");
const { readFile } = require("fs");
const { join } = require("path");

// define connection variables
const portNumber = 3000;
const host = "localhost";

// define function to return absolute path of requested file
const absolutePath = (resource) => join(__dirname, "views/", resource);

// instantiate http server and save to variable
const server = createServer((req, res) => {
    // destruct route url from request object
    const { url } = req;
    // define path to requested html file variable
    let path;
    // set response content type to html
    res.setHeader("ContentType", "text/html");

    // use switch to handle routing based on request url
    switch (url) {
        // root route
        case "/":
            path = absolutePath("home.html");
            res.statusCode = 200;
            break;
        // /home route (redirect to root route)
        case "/home":
            res.statusCode = 301;
            res.setHeader("Location", "/");
            res.end();
            break;
        // about route
        case "/about":
            path = absolutePath("about.html");
            res.statusCode = 200;
            break;
        // contact route
        case "/contact":
            path = absolutePath("contact.html");
            res.statusCode = 200;
            break;
        // not found catch-all
        default:
            path = absolutePath("404.html");
            res.statusCode = 404;
    }

    // respond with html file based on path
    readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    });
});

// listen for http request
server.listen(portNumber, host, () => {
    console.log(`listening on port: ${portNumber}`);
});
