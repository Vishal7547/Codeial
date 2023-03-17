const express=require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port=8000;
const cookieParser=require('cookie-parser');
const User=require('./models/user');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// use express router
app.use('/' , require('./routes'));

// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');






app.listen(port,(err)=>{
    if(err){
        console.log("Error is : ", err);
        return;
       
    }
    console.log(`server is running on port no: ${port}`)
})
