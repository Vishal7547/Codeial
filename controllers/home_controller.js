const Post=require('../models/post')

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
console.log('data of post : ',data);
return res.render('home',{
    title:"home",
    posts:data,
});
// return res.json({
//     data
// });


}

// module.exports.actionName=function(req,res){}
