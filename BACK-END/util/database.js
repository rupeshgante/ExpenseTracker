const {Sequelize}=require('sequelize');

const sequelize=new Sequelize('expensetracker','root','Learn@1122',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;
