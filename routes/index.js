const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller')
console.log('router is loaded');

router.get('/',home_controller.home)
module.exports=router;