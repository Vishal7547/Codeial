const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id",56)
    

// populate the user of each post
const data=await Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user',
    }
})
.exec();
// find all the user
const userData=await User.find();

// console.log('data of post : ',data);
return res.render('home',{
    title:"home",
    posts:data,
    all_user:userData,
});
// return res.json({
//     data
// });


}

// module.exports.actionName=function(req,res){}
