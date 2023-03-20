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

module.exports.destroy=async(req,res)=>{
const data=await Comment.findById(req.params.id);
if(data.user==req.user.id){
  let postId=data.post;
  await Comment.findByIdAndDelete(req.params.id);  
 await Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}});
 return res.redirect('back');
}else{
  return res.redirect('back');
}

}