const express = require('express');
var fortune = require('./lib/fortune.js')
const app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;



app.get('/',(req,res)=>{
   res.render('home')
    
});

app.get('/about',function(req,res){
    res.render('about',{fortune:fortune.getFortune()})
});

app.get('/404',function(req,res){
    res.render('404')
});

app.get('/500',function(req,res){
    res.render('500')
});


app.use((req,res)=>{
    res.type('text/plain')
    res.status(400)
    res.send('404 not found')
});

app.use((err,req,res,next)=>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 server error')
});

app.listen(port,()=>console.log(`server started on port: ${port}`));

