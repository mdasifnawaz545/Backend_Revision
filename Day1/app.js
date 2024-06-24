const express = require('express');
const path = require('path');
const app = express();
let data = require('./data/data')

app.use(express.urlencoded({extended:true}));
app.use(express.json())

const mo=require('method-override')
app.use(mo('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

let port = 3000;

app.listen(port, () => {
    console.log(`You contacted to port ${port}`)
})

app.get("/", (req, res) => {
    res.render("index.ejs", { data })
})

app.get("/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/add", (req, res) => {
    let { img, name, detail } = req.body;
    const obj = {
        img: img,
        name: name,
        detail: detail
    }
    data.push(obj);
    res.redirect("http://localhost:3000")
})

app.get("/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let obj=data.find((el)=>id===el.id+">");
    console.log(obj)
    res.render("edit.ejs",{obj})
});

app.put("/:id/edited",(req,res)=>{
    let {id}=req.params;
    let {name,detail}=req.body;
    let obj=data.find((el)=>(id===el.id+">"));
    obj.name=name;
    obj.detail=detail;
    res.redirect("http://localhost:3000")
})

app.delete("/:id/delete",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    // console.log(data)
    let newData=data.filter((el)=>{
        if(id!=el.id) return el;
        else console.log(el.id)
    })
    data=newData;
    // console.log(newData)
    // console.log(data)
    res.redirect("http://localhost:3000")
})