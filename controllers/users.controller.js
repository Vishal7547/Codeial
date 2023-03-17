const User=require('../models/user');

module.exports.profile = async function (req, res) {
 if(req.cookies.user_id){
const data = await User.findById(req.cookies.user_id);
if(data){
return res.render('user',{
    title:"User Profile",
    user:data,
})
}else{
return res.redirect('/users/sign-in');
}
 }else{
return res.redirect('/users/sign-in');
 }
};

module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "Codeial | signUp",
  });
};

module.exports.signIn = (req, res) => {
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
  module.exports.createSession = async(req, res) => {
    //    find the user
// steps to authenticate
const data=await User.findOne({email:req.body.email})
    // handle user found
if(data){
// handle password which do not match
if(data.password!=req.body.password){
 return res.redirect('back');
}
// handle session creation
res.cookie('user_id',data.id);
return res.redirect('/users/profile');
}else{
 // handle user not found
 return res.redirect('back');
}
    
   
      };  


