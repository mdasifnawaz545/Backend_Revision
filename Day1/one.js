// const mathFunc=require("./two")
// console.log(mathFunc.sum(3,2))
// console.log(mathFunc.sub(3,2))

// for(let x of process.argv) console.log(x+"aa");

const express=require('express')
const app=express();


app.use((err,req,res,next)=>{
    console.log(req.path,req.methhod,req.host,newDate(Date.now()).toString());
    console.log("req.path,req.methhod,req.host,Date.now()");
    next();
 });

app.get("/",(req,res)=>{
    res.send("Salaam");
});

app.listen(3000,(req,res)=>{
    console.log("Port 3000");
})