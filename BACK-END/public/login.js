const form=document.getElementById('form');

form.addEventListener('click',(e)=>{
    e.preventDefault();

    //login

    if(e.target.className=='login-button'){
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    axios.post('http://3.94.195.113:7000/login',{
        email:email,
        password:password
    })
    .then(res=>{
        alert(res.data.message);
        if(res.data.success){
            console.log(res.data);
            localStorage.setItem('token',res.data.token)
           if(res.data.user[0].ispremiumuser){
            localStorage.setItem('premium',1);
                        window.location.assign('http://127.0.0.1:5500/FRONT-END/expense/premium.html')
           }else{
            localStorage.setItem('premium',0);
            window.location.assign('http://127.0.0.1:5500/FRONT-END/expense/expense.html');
        }
    }
    })
    .catch((error) => {
        if( error.response ){
            console.log(error.response.data.message);
            alert (error.response.data.message);
        }
    })
}
//FORGOT password

if(e.target.className=='forgot-password'){
    console.log('clicked');
    document.querySelector('#forgot').style = "display:block;"
    document.querySelector('#login-form').style = "display:none;"

}
if(e.target.className=='reset'){
    const mail=document.getElementById('reset-email').value;
    console.log(mail);
    axios.post('http://3.94.195.113:7000/forgotpassword',{email:mail})
    .then(res=>{
        console.log(res);
        alert(res.data.message);
    })
    .catch(err=>{
        console.log(err);
    })

}
})

