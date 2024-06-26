const express=require('express');
const app=express();

app.listen(3000,(req,res)=>{
    console.log("Connected to 3000");
})

app.use((req,res,next)=>{
    console.log("Middleware 1")
    next();
})
app.use((req,res,next)=>{
    console.log("Middleware 2")
    next();
})

app.get("/api",(req,res)=>{
    throw new Error("Error")
    res.send(`Your Access Token is : ${req.query}`)
})

app.use("/api",(req,res,next)=>{
    let {accessToken}=req.query
    console.log();
    if(accessToken=="giveaccess"){
        next();
    }
    res.send("Not any query")
});

app.get("/",(req,res)=>{
    res.send("Salaam")
})




app.use((err,req,res,next)=>{
    console.log("Error Handled")
    res.send("Error is Handled")
});