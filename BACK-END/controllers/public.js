const User=require('../models/user');
const bcrypt=require('bcrypt');


exports.postSignup=(req,res,next)=>{
    console.log('post received');
    const saltRounds=10;
    // const name=req.body.name;
    // const email=req.body.email;
    // const phone=req.body.phone;
    // const password=req.body.password;
    const {name, email , phone,password} =req.body;
    bcrypt.genSalt(saltRounds,function(err,salt){
       bcrypt.hash(password,salt,function (err,hash) {
        
     if(err){
        res.json({message:'Unable to create new user'})
     }

    // console.log(name,email,phone,password);
            User.create({
                name:name,
                email:email,
                phone:phone,
                password:hash
            })
            .then(()=>{
                res.status(201).json({success:true,message:'Successfully Signed-Up'})

            })
            .catch(err => {
                res.status(403).json(err)
              })
            })
        })
              
}