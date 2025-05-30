const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

middleware -> response send

app.use((req,res,next)=>{
    console.log("Hi, I am 1 middleware");
    next();
});

app.use((req,res,next)=>{
    let{q} = req.query;
    console.log(q);
    console.log("Hi, I am 2 middleware");
    next();
});

// Utility Middleware --> morgan
app.use((req,res,next)=>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path,req.time);
    next();
});

Exploring app.use()
app.use("/random",(req,res,next)=>{
    console.log("I am only for random");
    next();
});

const checkToken = (req,res, next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        next();
    }
    throw new ExpressError (401,"ACCESS DENIED!");
};

// error generator
app.get("/wrong",(req,res)=>{
    abcd = abcd;
});

app.get("/api",checkToken,(req,res)=>{
    res.send("Data");
});

// admin route
app.get("/admin",(req,res)=>{
    // let {q} = req.query;
    // if(q==="prajwal"){
    //     res.redirect("/");
    // }
    throw new ExpressError(403,"Access is Forbidden");
})


// Default status & message

app.use((err,req,res,next)=>{
    let{status = 500,message ="some error occured"} = err;
    res.status(status).send(message); 
    // res.send(err);
});


//error handling middleware

app.use((err,req,res,next)=>{
    console.log("err 2");
    next(err);
})



// 404
app.use((req,res,next)=>{
    res.send("Page not found!");
    next();
});

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

app.get("/random",(req,res)=>{
    res.send("This is a random page");
});

// // 404
app.use((req,res)=>{
    res.send("Page not found!");
});

// Utility Middleware --> will not work
app.use((req,res,next)=>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path,req.time);
    next();
});

app.listen(8080,(req,res)=>{
    console.log("Connection established");
})

/*
   
const express=require("express");
const app=express();

const port=8080;


// our first middleware
/* app.use((req,res)=>{
     let{q} = req.query;
    console.log(q);
    console.log("hi iam middleware");
    res.send("middleware finished");
});


app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});


app.get("/random",(req,res)=>{
    res.send("This is a random page");
});

app.listen(port,()=>{
    console.log(`port is listened successfully ${port}`);
}); */


// next()

app.use((req, res, next) => {
  console.log("hi I am middleware");
  next(); // let the request go to the next handler
  console.log("This is after next()");   // // This is considered bad practice,because next is end of the code
});

app.use((req, res, next) => {
  console.log("hi I am 2nd  middleware");
  next(); // let the request go to the next handler
});

  /*
    suppose we enter in localhost any unknown path but middleware runs
  */

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/random", (req, res) => {
  res.send("This is a random page");
});

//creating utility middleware

app.use((req,res,next)=>{
    req.time = new Date(Date.now()).toString();  // The middleware executes before the response is sent to the client.
    console.log(req.method, req.hostname, req.path,req.time);// that is the reason middleware written in last
    next();
});

// exploring app.use for all un matched routes

app.use("/random", (req, res,next) => {
  res.send("I am only for random");
  next();
});

app.use((req,res)=>{
    res.send("page not found");  
}); 

//Api token as query string
app.use("/api",(req,res, next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        next();
    }
    throw new ExpressError (401,"ACCESS DENIED!");
});

app.get("/api",(req,res)=>{
    res.send("Data");
});

//passing multiple middlewares
const checkToken = (req,res, next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        next();
    }
    throw new ExpressError (401,"ACCESS DENIED!");
};

app.get("/api",checkToken,(req,res)=>{
    res.send("Data");
});

//Error handling (express default)
app.get("/err",(req,res)=>{
    abcd = abcd;
});


app.use((req,res)=>{
    res.status(404).send("page not found");
});

app.listen(port, () => {
  console.log(`port is listened successfully ${port}`);
});


*/
