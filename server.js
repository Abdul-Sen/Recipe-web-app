const express = require('express');
const app = express();
const path = require('path');
const exphbs = require("express-handlebars");
const HTTP_PORT = 8080;
//TODO: Build parser for ingreidents in data-service
//TODO: Add a dataservice that gets speicifc recipe
//TODO: Use navLink to fix active navbar
//TODO: In future create a microservice that refreshes every 24h to display "Recipe of the day"

// TEMPORARY FAKE DATA
let myObj =[ {
    difficulty : 4,
    imgName: "./1.jpg",
    intro: "A delicious delight",
    name: "Pizza",
    ingredients: "Tomato, peparoni, cheese",
    desc: "First get some dough, then make it round, then put the ingredients on, after that"
},
{
    difficulty : 2,
    imgName: "/1.jpg",
    intro: "A delicious delight",
    name: "Burger",
    ingredients: "Tomato, patty, cheese, fries, buns",
    desc: "First get some buns, put some lettice and tomato on them, and then put the patty and ketchup and fries"
}
];

let pizza = {
    difficulty : 4,
    imgName: "./1.jpg",
    intro: "A delicious delight",
    name: "Pizza",
    ingredients: "Tomato, peparoni, cheese",
    desc: "First get some dough, then make it round, then put the ingredients on, after that"
}
// TEMPORARY FAKE DATA END
//Handlebars config
app.engine('.hbs', exphbs(
    {
         extname: '.hbs',
         defaultLayout: "main",
         helpers: {
            navLink: function (url, options) {
                return '<li' +
                    ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
                    '><a href="' + url + '">' + options.fn(this) + '</a></li>';
            }
        }
    })
);
app.set('view engine', '.hbs');

//static resources
app.use(express.static("public"));


app.get('/', function(req, res) {
    res.render("index", {
    });
});

app.get('/login',(req,res)=>{
    res.render("login",{});
})

app.get('/recipe', (req,res)=>{
    res.render('recipe',{});
})

app.get('/viewrecipe',(req,res)=>{
    console.log({data: myObj});//TEMPORARY: Chekcing what my obj looks like
    res.render("viewrecipe",{data: myObj});
})

app.get('/recipedetails', (req,res)=>{
    res.render('recipedetails', {data: pizza});
})

app.listen(HTTP_PORT, ()=>{
    console.log(`Listening on ${HTTP_PORT}`);
})
