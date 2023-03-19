const Comment=require('../models/comment');
const Post=require('../models/post')

module.exports.create=async(req,res)=>{
const data=await Post.findById(req.body.post)
if(data){
  const comment= await Comment.create({
    content:req.body.content,
    post:req.body.post,
    user:req.user._id, 
   });

   data.comments.push(comment);
   data.save();
   res.redirect('/');
}
}