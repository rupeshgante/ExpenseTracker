const User=require('../models/user');
const Expense=require('../models/expense');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


exports.addExpense=(req,res)=>{
    // res.json('received');
    console.log('received expense');
    const {amount,description,catageory}=req.body;
    req.user.createExpense({amount,description,catageory})
               .then(expense=>{
                res.status(200).json({expense,success:true});
               })
               .catch(err=>{
                res.status(402).json({error:err,success:false});
               })
}


exports.getExpense=(req,res)=>{
    req.user.getExpenses()
              .then(expense=>{
                res.status(200).json(expense);
              })
              .catch(err=>{
                res.status(402).json({error:err,success:false});
              })
}

exports.deleteExpense=(req,res)=>{
    const expense=req.params.expenseId;
    Expense.destroy({where:{id:expense}})
                     .then(()=>{
                        res.status(200).json({success:true,message:'successfully deleted'})
                     })
                     .catch(err=>{
                        res.status(403).json({success:false,message:err});
                     })
}