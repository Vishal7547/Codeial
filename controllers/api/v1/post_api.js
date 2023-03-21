const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async(req,res)=>{

    const data=await Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user',
    }
})

    return res.json(200,{
        message:'List of posts',
        post:data,
    })
    }


    module.exports.destroy=async(req,res)=>{
        try{
    const data=await Post.findById(req.params.id);
    // if(data.user==req.user.id){
    await Post.findByIdAndDelete(req.params.id);   
    await Comment.deleteMany({post: req.params.id});
    // req.flash('success','post associated comment deleted');
    return res.json(200,{
        message:'post and associated comment successfully',
    })
    // }else{
        // req.flash('error','you can not delete this post')
        // return res.redirect('back');
    // }
        }catch(e){
        // req.flash('error',e);
    
            console.log(e);
            return res.json(500,{
                message:"internal server error"
            })

        }
    } 