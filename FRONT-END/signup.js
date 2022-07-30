const signup=document.getElementById('signup-container');

signup.addEventListener('click',(e)=>{
    if(e.target.className=='signup-button'){
const name=document.getElementById('name').value;
const email=document.getElementById('email').value;
const phone=document.getElementById('phone').value;
const password=document.getElementById('password').value;

    axios.post('http://localhost:7000/signup',{
        name:name,
        email:email,
        phone:phone,
        password:password
    })
    .then(res=>{
        // console.log(res);
        if(res.status==201){
            notifyUser(res.data.message);
            document.getElementById('name').value='';
document.getElementById('email').value='';
document.getElementById('phone').value='';
document.getElementById('password').value='';
        }else{
            throw new Error();
        }
    })
    .catch(err=>{
        console.log('this is error'+err);
    notifyUser(err.message);
})
}

})

function notifyUser(message){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500);
}
