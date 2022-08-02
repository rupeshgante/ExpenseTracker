const express= require('express');

const app= express();

const cors=require('cors');

const bodyParser=require('body-parser');

const sequelize=require('./util/database');

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const User=require('./models/user');
const Expense=require('./models/expense');

User.hasMany(Expense);
Expense.belongsTo(User,{ constraints: true, onDelete: 'CASCADE' });

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');

app.use(userRoutes);
app.use('/user',expenseRoutes);

sequelize
// .sync({force:true})
  .sync()
  .then(res=>{
    // console.log(res);
    app.listen(7000);
  })
  .catch(err => {
    console.log(err);
  });


