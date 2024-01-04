let username=document.querySelector(".name")
let Email=document.querySelector(".email")
let password=document.querySelector(".password")
let btnCreate=document.querySelector(".create")

// notifications
// const notifications = document.querySelector(".notifications");
let enterName = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #ffa200; font-size:20px"></i> please the name is require `;
let enterEmail = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #ffa200; font-size:20px"></i> please the email is require `;
let enterPassword = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #ffa200; font-size:20px"></i> please the password is require `;

let normalClss = 'toast';
let closeStyle = `<i class="fa-solid fa-xmark ms-5 ps-4 " style="color: #787b7d;"></i>`


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    if(data.name === ''){
        showToast(enterName, normalClss, closeStyle);
    }
    if(data.email === ''){
        showToast(enterEmail, normalClss, closeStyle);
    }
    if(data.password === ''){
        showToast(enterPassword, normalClss, closeStyle);
    }
    if(data.name && data.email && data.password){

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(userData => {
            console.log(userData);
            if(userData.status === 'Success'){
                console.log(userData.data);
                const userobj={
                    _id: userData.data._id,
                    username: userData.data.name,
                    email: userData.data.email,
                }
                const token = userData.data.token;
                localStorage.setItem("userobj" , JSON.stringify(userobj))
                localStorage.setItem("token", JSON.stringify(token))
                window.location.href = `../index.html`;
            }else{
                let Error = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #ffa200; font-size:20px"></i> ${userData.message} `;
                showToast(Error, normalClss, closeStyle);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});


    let toastBox=document.getElementById("toastBox")
    function showToast(show, classToast, closeStyle){
        let toast= document.createElement("div");
        toast.classList.add(classToast);
        let close=document.createElement("span")
        toast.style.cssText="margin:10px 0px ;"
        if(closeStyle)
            close.innerHTML = closeStyle;
        else
            close.innerHTML=`<i class="fa-solid fa-xmark ms-5 ps-5 " style="color: #787b7d;"></i>`
            toast.innerHTML= show;
            toast.appendChild(close)
            toastBox.appendChild(toast);

            close.addEventListener("click",()=>{
                toast.remove();
            })
        setTimeout(()=>{
            toast.remove()
        },6000)
    }


