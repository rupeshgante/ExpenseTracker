const form=document.getElementById('form');

form.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.className=='login'){
    const email=form.email.value;
    const password=form.password.value;

    axios.post('http://localhost:7000/login',{
        email:email,
        password:password
    })
    .then(res=>{
        // alert(res.data.message);
        if(res.data.success){
            console.log(res.data);
            localStorage.setItem('token',res.data.token)
           if(res.data.user[0].ispremiumuser){
                        window.location.assign('http://127.0.0.1:5500/FRONT-END/expense/premium.html')
           }else{
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
if(e.target.className=='forgot-password'){
    console.log('clicked');
    document.querySelector('#forgot').style = "display:block;"
}
if(e.target.className=='reset'){
    axios.post('http://localhost:7000/forgotpassword',{})

}
})

