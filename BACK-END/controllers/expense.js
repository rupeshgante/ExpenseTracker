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
    let total=req.user.totalexpense;
    total=total+(+amount);
    console.log('amount ',total)
    req.user.createExpense({amount,description,catageory})
               .then(expense=>{
                // console.log('useds',req.user.totalexpense);
                req.user.update({totalexpense:total})
                res.status(200).json({expense,success:true});
               })
               .catch(err=>{
                res.status(402).json({error:err,success:false});
               })
}


exports.getExpense=(req,res)=>{
  const id=req.user.id;
  console.log('id :',id);
    req.user.getExpenses()
              .then(expense=>{
                res.status(200).json(expense);
              })
              .catch(err=>{
                res.status(402).json({error:err,success:false});
              })
}

exports.getOneExpense=(req,res)=>{
  const id=req.query.user_id;
  Expense.findAll({where:{userId:id}})
     .then(response=>{
         console.log(response);
         res.status(200).json(response);
     })
     .catch(err=>{
      res.status(402).json(err);
     })
}



exports.getAllUser=(req,res)=>{
  User.findAll({
    order: [
      ["totalexpense", "DESC"]
    ]
  })
       .then(user=>{
        // console.log(user)
res.status(200).json(user);
       })
       .catch(err=>{
        res.status(402).json({error:err,success:false});
       })
}

exports.deleteExpense=(req,res)=>{
    const expense=req.params.expenseId;
    let total=req.user.totalexpense;
    // console.log('total : ',total);
    let amount=req.body.amount;
    // console.log('am',amount);
    total=total-amount;
    console.log('total afgter : ',total);

    
    Expense.destroy({where:{id:expense}})
                     .then(()=>{
                      req.user.update({totalexpense:total})
                        res.status(200).json({success:true,message:'successfully deleted'})
                     })
                     .catch(err=>{
                        res.status(403).json({success:false,message:err});
                     })
}