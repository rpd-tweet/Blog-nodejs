const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

// express app

const app = express();   // express invoked
// connect to db
const dbURI = "mongodb+srv://rpd99:blog_me1@cluster0.n6nf0.mongodb.net/node-blogs?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})         //asyn task
    .then((result) => app.listen(3000))
    .catch((err) =>console.log(err))
    

      
// register view engine as ejs
app.set("view engine", "ejs");
// app.set("views", "my-views");   // bt default it checks views folder, it can also be changed


// middleware + static files

app.use(express.static("public"));
app.use(express.urlencoded())
app.use(morgan("short"))        // thrd part middleware

//routes  
app.use((req, res, next) => {
    console.log("Hostname : ", req.hostname);
    console.log("Path : ", req.path);
    console.log("Method : ",req.method);
    next();
})

app.get("/", (req, res) => {
   res.redirect("/blogs")
});

app.get("/about", (req, res) => {
    //res.send("<p>Home page</p>");
    res.render("about", { title: "About" });
});

app.use("/blogs",blogRoutes);

// 404 error page
app.use((req, res) =>  {                                           // uses this fn for every single req, this is used if no match is found
    res.status(404).render("404", { title: "404" });                                // express executes line by line, so this must be placed below
});
