const form=document.getElementById('expense-form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const amount=form.amount.value;
    const description=form.description.value;
    const catageory=form.catageory.value;
    const expensedetails={
        amount,description,catageory
    }
const token=localStorage.getItem('token');
// console.log(token,amount,description,catageory);

axios.post('http://localhost:7000/user/addexpense',
    expensedetails,
    {headers:{Authentication:token}}
)
.then(res=>{
    console.log(res);
    add(res.data.expense);
})
.catch(err=>{
    console.log(err);
})

})



const getdata=document.getElementById('get-expense');
const token=localStorage.getItem('token');
getdata.addEventListener('click',()=>{
    axios.get('http://localhost:7000/user/getexpense',{headers:{Authentication:token}})
                 .then(res=>{
                    for(var i=0;i<res.data.length;i++){
                        add(res.data[i]);
                    }
                 })
                 .catch(err=>{
                    console.log(err);
                 })
})


function add(data){
    var listOfExpenses=document.getElementById('listOfExpenses');
    var li=document.createElement('li');
    li.appendChild(document.createTextNode(`Amount : ${data.amount}  ||Description : ${data.description}  ||Catageory : ${data.catageory}`));
    // var edit=document.createElement('input');
    // edit.id='edit';
    // edit.value='EDIT';
    // edit.type='button';
    // edit.style.border="2px solid green";
    // li.appendChild(edit);
//     edit.addEventListener('click',async ()=>{
//         try{
//         var a=document.getElementById('amount');
//         var d=document.getElementById('description');
//         var c=document.getElementById("catageory");
//         a.value=data.amount;
//         d.value=data.description;
//         c.value=data.catageory;
//         await axios.delete(`https://crudcrud.com/api/f7a3df4f0bef4671866ffb2c06286286/ExpenseData/${data._id}`)
//              li.remove();
//         }
//     catch(err){
//    console.log(err);
//     }
//     })
    var del=document.createElement('input');
    del.id='delete';
    del.value='DELETE';
    del.type='button';
    // del.style.border="2px solid red";
    li.appendChild(del)
    del.addEventListener('click',async()=>{
        try{
        await axios.delete(`http://localhost:7000/user/deleteexpense/${data.id}`,{headers:{Authentication:token}})
             li.remove();
        }
        catch(err){
            console.log(err);
        }
})
    listOfExpenses.appendChild(li);
    }



    var premium=document.getElementById('premium-membership');
    premium.addEventListener('click',async(e)=>{
        const token=localStorage.getItem('token');
        console.log('token :',token);
        const response= await axios.get('http://localhost:7000/user/premiummembership',{headers:{Authentication:token}});
        var options=
        {
            "key":response.data.key_id,
            "name":"Test Company",
            "order_id":response.data.order.id,
            "prefill":{
                "name":"TEST USER",
                "email":"test@email.com",
                "contact":"9963251062"
            },
            "theme":{
                "color":"#3399c"
            },
            "handler":function(response){
                console.log('sent');
                axios.post('http://localhost:7000/user/updatetransaction',{
                    order_id : options.order_id,
                    payment_id : response.razorpay_payment_id,
            
          },{headers:{Authentication:token}}
          ).then(()=>{
            document.body.style.background='linear-gradient(45deg,#a6bbba,#25322b)';
            const premium=document.getElementById('form');
            premium.style.background='linear-gradient(45deg,#cee3e2,#32e7e7)';

            alert('You are a Premium Member Now');

          }).catch(()=>{
            alert('Something went wrong');
          })
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
      
        rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
       });
    })