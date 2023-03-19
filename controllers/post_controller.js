const Post=require('../models/post');

module.exports.create= async(req,res)=>{
try{

    await Post.create({
        content:req.body.content,
        user:req.user._id,
    });
return res.redirect('back');
}catch(e){
console.log('error in post_controller:', e);
return res.redirect('back');
}


    }

// module.exports.actionName=function(req,res){}
 
    