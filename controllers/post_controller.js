const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async(req,res)=>{
try{

    await Post.create({
        content:req.body.content,
        user:req.user._id,
    });
req.flash('success','post published');    
return res.redirect('back');
}catch(e){
console.log('error in post_controller:', e);
req.flash('error',e);
return res.redirect('back');
}


    }

module.exports.destroy=async(req,res)=>{
    try{
const data=await Post.findById(req.params.id);
if(data.user==req.user.id){
await Post.findByIdAndDelete(req.params.id);   
await Comment.deleteMany({post: req.params.id});
req.flash('success','post associated comment deleted');
return res.redirect('back');
}else{
    req.flash('error','you can not delete this post')
    return res.redirect('back');
}
    }catch(e){
    req.flash('error',e);

        console.log(e);
    }
}   

// module.exports.actionName=function(req,res){}
 
    