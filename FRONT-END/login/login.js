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
        alert(res.data.message);
    })
    .catch((error) => {
        if( error.response ){
            console.log(error.response.data.message);
            alert (error.response.data.message);
        }
    })
})