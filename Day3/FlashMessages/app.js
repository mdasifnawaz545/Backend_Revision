const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash')

let sessionConfiguration = {
    secret: "kelfarhecelckimiliyt",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfiguration))
app.use(flash());

// app.use((req, res, next) => {
//     req.flash('success', "Verified Successfully")
//     req.flash('failure', "Failure had Occured")
//     req.flash('warning', "Warning Message");
//     next();
// })





let port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});

app.get("/", (req, res) => {
    res.render("Home.ejs")
})

app.get("/setCookie", (req, res) => {
    let { q = 'No Username' } = req.query;
    req.session.name = q;
    res.locals.verifyMessage=req.flash('success')
    res.render('show.ejs',{name:req.session.name})
});
app.get("/warning", (req, res) => {

    res.locals.verifyMessage=req.flash('warning')
    res.render('show.ejs',{name:req.session.name})
});
app.get("/failure", (req, res) => {
    let { q = 'No Username' } = req.query;
    req.session.name = q;
    res.locals.verifyMessage=req.flash('failure')
    res.render('show.ejs',{name:req.session.name})
});



