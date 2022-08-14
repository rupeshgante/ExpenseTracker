const express= require('express');

const app= express();

const cors=require('cors');

const bodyParser=require('body-parser');

const sequelize=require('./util/database');

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');
const Forgotpassword=require('./models/forgotpassword');
const DownloadedFile=require('./models/downloadedfiles');

User.hasMany(Expense);
Expense.belongsTo(User,{ constraints: true, onDelete: 'CASCADE' });
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
User.hasMany(DownloadedFile);
DownloadedFile.belongsTo(User);

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
const passwordRoutes=require('./routes/password');

app.use(userRoutes);
app.use('/user',expenseRoutes);
app.use('/user',purchaseRoutes);
app.use(passwordRoutes);

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


