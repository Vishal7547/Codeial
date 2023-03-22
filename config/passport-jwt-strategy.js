const passport =require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'codeial';

passport.use(new jwtStrategy(opts, async function(jwt_payload, done) {
 try{
    const data=await User.findOne({id: jwt_payload._id});
    if(data){
     return done(null, data);
    }else{
     return done(null, false);
    }
 }catch(e){
    return done(e, false);
 }
}));




// , function(err, user) {
//     if (err) {
        
//         return done(err, false);
//     }
//     if (user) {
//         return done(null, user);
//     } else {
//         return done(null, false);
//         // or you could create a new account
//     }
// }