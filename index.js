const express=require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookies
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const mongoStore=require('connect-mongo');
const scssMiddleware=require('node-sass-middleware');
// port no
const port=8000;
const cookieParser=require('cookie-parser');
const User=require('./models/user');


// scss middleware use

app.use(scssMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css',


}))

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





// setup the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'codeial',
    // TODO chage the secret before deployment in production mode

    secret:'blasomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    // store:new mongoStore({
        
    //         mongooseConnection:db,
    //         autoRemove:'disabled',
        
    // },(err)=>{
    //     console.log(err || 'connect mongodb setup ok')
    // }
    // )
    store: mongoStore.create(db)


}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

// use express router
app.use('/' , require('./routes'));


app.listen(port,(err)=>{
    if(err){
        console.log("Error is : ", err);
        return;
       
    }
    console.log(`server is running on port no: ${port}`);
})
