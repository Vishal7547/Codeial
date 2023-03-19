const Post=require('../models/post')

module.exports.home=async function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id",56)
    

// populate the user of each post
const data=await Post.find({}).populate('user').exec();
return res.render('home',{
    title:"home",
    posts:data,
});


}

// module.exports.actionName=function(req,res){}
