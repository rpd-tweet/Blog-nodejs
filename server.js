const http = require('http');
const fs = require('fs');
const _ = require("lodash");

const server = http.createServer((req, res) => {    // creates server
    //console.log(req.url, req.method);



    // lodash
    const num = _.random(0, 9);
    console.log(num);

    const greet = _.once(() => {
        console.log("hello");
    });

    greet();
    greet();


    // set header content types
    res.setHeader("Content-Type", "text/html");



    // routing
    let path = "./views/";
    switch (req.url) {
        case '/':
            path += "index.html";
            res.statusCode = 200;                      // status code
            break;
        case '/about':
            path += "about.html";
            res.statusCode = 200;                       //  status code
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();                     //  status code
            break;
        default:
            path += "404.html";
            res.statusCode = 404;                       // status code
            break;
    }
    // send html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            // res.write(data);  // cansend directly through end method
            res.end(data);
        }
    })


    // res.write("<p>Hi there!</p>");
    // res.end();                                      // end our response to browser

});


server.listen(3000, 'localhost', () => {                // listens to req and res through the mentioned port
    console.log("listening at port 3000")           // reverse loop => loops back to browser
});                                                 // browser is the server here