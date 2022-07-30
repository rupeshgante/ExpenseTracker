const express= require('express');

const app= express();

const cors=require('cors');

const bodyParser=require('body-parser');

const sequelize=require('./util/database');

app.use(cors());

app.use(bodyParser.json({ extended: false }));

const User=require('./models/user');

const publicRoutes=require('./routes/public');

app.use(publicRoutes);

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


