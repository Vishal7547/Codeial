const express=require('express');
const app=express();
// use express router
app.use('/' , require('./routes'));

// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

const port=8000;

app.listen(port,(err)=>{
    if(err){
        console.log("Error is : ", err);
        return;
       
    }
    console.log(`server is running on port no: ${port}`)
})
