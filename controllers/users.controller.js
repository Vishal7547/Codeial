const User=require('../models/user');

// module.exports.profile = function (req, res) {
//   return res.render('user', {
//         title: 'User Profile'
//     })
// };

module.exports.profile = function(req, res) {
    
  return res.render('user',{
      title: "user Page"
  });
}

module.exports.signUp = (req, res) => {
 if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

  return res.render("user_sign_up", {
    title: "Codeial | signUp",
  });
};

module.exports.signIn = (req, res) => {
if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

  return res.render("user_sign_in", {
    title: "Codeial | signIn",
  });
};

// get the signup data

module.exports.create = async(req, res) => {
//    todo later
if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
}

const data=await User.findOne({email:req.body.email})
console.log('data is:  ',data);
if(!data){
 const userData=  await User.create(req.body); 
 console.log(userData);
 return res.redirect('/users/sign-in');
}else{
    return res.redirect('back');
}

  };

// signIn and create a session for a user
  module.exports.createSession = (req, res) => {
   return res.redirect('/');
      };  

// logout function
  module.exports.destroySession = async(req, res,next) => {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
      res.redirect('/');
    });
  };  

