const express=require('express');

const router=express.Router();

const pubilcController=require('../controllers/user');

router.post('/signup',pubilcController.postSignup);

router.post('/login',pubilcController.postLogin);


module.exports=router;
 