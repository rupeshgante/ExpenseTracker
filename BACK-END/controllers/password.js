const User=require('../models/user');
const Expense=require('../models/expense');
const sendmail=require('@sendgrid/mail');

sendmail.setApiKey(process.env.SENGRID_API_KEY);

const dotenv = require('dotenv');
dotenv.config();

exports.forgotPassword=(req,res)=>{
   const mail=req.body.email;
   console.log(mail);
    const message={
    to:mail,
    from:'rupeshgante@gmail.com',
    subject:'reset password link',
    text:'Reset your password here'
   }
   sendmail.send(message)
      .then(response=>{
        res.status(200).json('Reset link sent to email')
      })
      .catch(err=>{
        res.status(400).json(err);
      })
}