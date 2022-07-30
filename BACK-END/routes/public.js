const express=require('express');

const router=express.Router();

const pubilcController=require('../controllers/public');

router.post('/signup',pubilcController.postSignup);


module.exports=router;