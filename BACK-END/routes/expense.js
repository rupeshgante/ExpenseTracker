const express=require('express');
const authentication=require('../middleware/auth');

const router=express.Router();

const ExpenseController=require('../controllers/expense');

router.post('/addexpense',authentication.authenticate,ExpenseController.addExpense);

router.get('/getexpense',authentication.authenticate,ExpenseController.getExpense);

router.delete('/deleteexpense/:expenseId',authentication.authenticate,ExpenseController.deleteExpense);

module.exports=router;
