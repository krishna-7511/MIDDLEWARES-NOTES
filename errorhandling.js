
const express=require("express");
const app=express();
const ExpressError=require("./ExpressError");

const port=8080;


app.get("/random",(req,res)=>{
    res.send("This is a random page");
});

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


app.get("/err",(req,res)=>{
    abcd = abcd;
});

//admin
app.get("/admin",(req,res)=>{
    throw new ExpressErrorError(403,"Acess is forbidden");
});

// app.use((err,req,res,next)=>{
//     // console.log(err);
//     console.log("---Error---");
//     next(err);
// });

// app.use((err,req,res,next)=>{
//     // console.log(err);
//     console.log("---Error2---");
//     next(err);
// });

// app.use((err,req,res,next)=>{
//     // console.log(err);
//     console.log("---Error---");
//     res.send(err);
// });


//Default status & message

app.use((err,req,res,next)=>{
    let {status=500,message="some error occured"}=err;
    res.status(status).send(message);
});


app.use((req,res)=>{
    res.status(404).send("page not found");
});

app.listen(port,()=>{
    console.log(`port is listened successfully ${port}`);
}); 



