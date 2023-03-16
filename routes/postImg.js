const express=require('express');
const router=express.Router();
const post_controller=require('../controllers/post_controller');
router.get('/postImg',post_controller.postsImage);
module.exports=router;