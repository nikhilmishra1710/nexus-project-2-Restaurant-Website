const bg=document.querySelector(".main_container");
const signup=document.querySelector(".signup");
const login=document.querySelector(".login");
const signup_error=document.querySelector(".signup_error");
const login_error=document.querySelector(".login_error");
var login_interface=true
var theta=120,dtheta=1;
var validPwd=false

setInterval(
    ()=>{
        // pos1=(Math.random()*100)%5;
        // alert(pos1)
        bg.style=`background: rgb(95, 43, 208);
        background: linear-gradient(${theta}deg, rgba(134,43,208,1) 5%, rgba(49,21,190,1) 50%, rgba(69,252,228,1) 93%);`;
        if(theta>170) dtheta=-1;
        if(theta<100) dtheta=1;

        theta+=dtheta;
    },750
)

function changeEvent(){
    if(login_interface){
        signup.classList.add("active");
        login.classList.remove("active");
        login_interface=!login_interface;
    }else{
        signup.classList.remove("active");
        login.classList.add("active");
        login_interface=!login_interface;
    }
}

async function validateLogin(){
    const uname=document.querySelector("#uname_login").value;
    const pwd=document.querySelector("#passwd_login").value;

    if(uname===""){
        login_error.innerHTML="Enter a Username"
    }else if(pwd===""){
        login_error.innerHTML="Enter a Password"
    }else{
        //USER VALIDATION LOGIC
        alert("BYEEEEEEE")
        try{
            const res=await fetch("https://foody-moody-server.onrender.com/login",{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json",
                    "Auth-token": "password",
                    "Password": pwd
                },
                "body":JSON.stringify({
                    "username":uname
                })
            })

            const data=await res.json()
            console.log(data)
            if(data.isSuccess){
                localStorage.setItem("user",data.user)
                window.location.href = "/home.html";
            }else{
                login_error.innerHTML=data.msg
            }

        }catch(error){
            console.log(error)
            login_error.innerHTML="Unable to connect to server!!"
        }
    }
}

async function validateSignup(){
    const name= document.querySelector("#name").value;    
    const email= document.querySelector("#email").value;
    const uname=document.querySelector("#username").value;
    const pwd=document.querySelector("#passwd").value;
    console.log(name,email,uname,pwd)

    if(name===""){
        signup_error.innerHTML="Enter your First name"
    }else if(uname===""){
        signup_error.innerHTML="Enter a Username"
    }else if(pwd===""){
        signup_error.innerHTML="Enter a Password"
    }else if(email===""){
        signup_error.innerHTML="Enter an Email"
    }else if(uname.includes(" ")){
        signup_error.innerHTML="Username should not contain space"
    }else if(pwd.includes(" ")){
        signup_error.innerHTML="Password should not contain space"
    }else if(pwd.length<4 || pwd.length>8){
        signup_error.innerHTML="Password should contain 4-8 characters"
    }else{
        //USER ADDITION LOGIC
        try{
            const res=await fetch("https://foody-moody-server.onrender.com/signup",{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json",
                    "Auth-token": "password",
                    "Password": pwd
                },
                "body":JSON.stringify({
                    "username":uname,
                    "name":name,
                    "email":email
                })
            })

            const data=await res.json()
            console.log(data)

            if(data.isSuccess){
                localStorage.setItem("user",data.user)
                window.location.href = "home.html";
            }else{
                login_error.innerHTML=data.msg
            }

        }catch(error){
            console.log(error)
            login_error.innerHTML="Unable to connect to server!!"
        }
    }
}

function existingUser(){
    const user=localStorage.getItem("user")
    if (user){
        window.location.href="home.html"
    }
}

function removeError(){
    login_error.innerHTML="";
    signup_error.innerHTML=""
}

existingUser()