const User=require('../models/user');
const fs=require('fs');
const path=require('path');

// module.exports.profile = function (req, res) {
//   return res.render('user', {
//         title: 'User Profile'
//     })
// };

module.exports.profile = async function(req, res) {
   const data= await User.findById(req.params.id);
  return res.render('user',{
      title: "user Page",
      profile_user:data,
  });
}

module.exports.update=async (req,res)=>{
if(req.user.id==req.params.id){
try{
  // const data= await User.findByIdAndUpdate(req.params.id,req.body);
 let user=await User.findById(req.params.id);
 User.uploadedAvatar(req,res,(e)=>{
  if(e){
    console.log("**multer error", e);
  }
  user.name=req.body.name;
  user.email=req.body.email;
if(req.file){
  if(user.avatar){
fs.unlinkSync(path.join(__dirname,'..',user.avatar));
  }
  // this is saving the path of the uploaded file into the avatar field in the user
  user.avatar =User.avatarPath+'/'+req.file.filename;
}
user.save();
  // console.log(req.file);
   return res.redirect('back');
 });
 
}catch(e){
  req.flash('error',e);
return res.redirect('back');
}
}else{
  req.flash('error','unauthorized');
  return res.status(401).send('unauthorized');
}
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
  req.flash('success','logged in successful');
    return res.redirect('/');
      };  

// logout function
  module.exports.destroySession = async(req, res,next) => {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
    req.flash('success','you have logged out');
    return res.redirect('/');
    });
  };  

