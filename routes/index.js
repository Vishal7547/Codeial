const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller')
console.log('router is loaded');

router.get('/',home_controller.home)
router.use('/users',require('./users'));
router.use('/users',require('./postImg'));

// for any further routers,access from here
// router.use('/routerName',require('./routerFile'));

module.exports=router;