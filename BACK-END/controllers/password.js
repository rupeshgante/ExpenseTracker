const User=require('../models/user');
const Expense=require('../models/expense');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.forgotPassword=(req,res)=>{
    console.log('receiveed');
    res.json('received');
}