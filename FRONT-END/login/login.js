const form=document.getElementById('login-form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=form.email.value;
    const password=form.password.value;

    axios.post('http://localhost:7000/login',{
        email:email,
        password:password
    })
    .then(res=>{
        // alert(res.data.message);
        if(res.data.success){
            console.log(res.data.token);
            localStorage.setItem('token',res.data.token)
            window.location.assign('http://127.0.0.1:5500/FRONT-END/expense/expense.html')
        }
    })
    .catch((error) => {
        if( error.response ){
            console.log(error.response.data.message);
            alert (error.response.data.message);
        }
    })
})