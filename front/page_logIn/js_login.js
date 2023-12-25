let username=document.querySelector(".name")
let password=document.querySelector(".password")
let btnLogin=document.querySelector(".login")
let storage=JSON.parse(localStorage.getItem("userobj"))

let dataNotFount = `<i class="fa-solid fa-triangle-exclamation pe-2" style="color: red; font-size:20px"></i>data not found!`;
let wrong = `<i class="fa-solid fa-circle-exclamation pe-2 pt-1" style="color: #ffa200;font-size:20px"></i>please check from name or password`;

let normalClss = 'toast';
let errorlClss = "toast-error";
let closeStyleError = `<i class="fa-solid fa-xmark ms-5  " style="color: #787b7d;"></i>`;
let closeStyle = `<i class="fa-solid fa-xmark ms-5 ps-4 " style="color: #787b7d;"></i>`
let enterEmail = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #ffa200; font-size:20px"></i> please the email is require `;
let enterPassword = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #ffa200; font-size:20px"></i> please the password is require `;



document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    if(data.email === ''){
        showToast(enterEmail, normalClss, closeStyle);
    }
    if(data.password === ''){
        showToast(enterPassword, normalClss, closeStyle);
    }
    if(data.email && data.password){

        fetch('/login', {
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
                    username: userData.data.name,
                    email: userData.data.email,
                };
                const token = userData.data.token;
                localStorage.setItem("userobj" , JSON.stringify(userobj))
                localStorage.setItem("token", JSON.stringify(token))
                window.location.href = `../index.html`;
            }else{
                let Error = `<i class="fa-solid fa-circle-exclamation pe-2 pt-1" style="color: #ffa200;font-size:20px"></i> ${userData.message} `;
                showToast(Error, errorlClss, closeStyle); 
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

//btnLogin.addEventListener("click",(event)=>{

//    event.preventDefault();
//    let toastBox=document.getElementById("toastBox")

//     if(!storage){
//         // alert("data not found!");
//         function showToast(){
//             let toast= document.createElement("div");
//             toast.classList.add("toast-error");
//             let close=document.createElement("span")
//             // close.style.cssText="margin-left:170px ;"
//             close.innerHTML=`<i class="fa-solid fa-xmark ms-5  " style="color: #787b7d;"></i>`
//             toast.innerHTML=`<i class="fa-solid fa-triangle-exclamation pe-2" style="color: red; font-size:20px"></i>data not found!`;
//             toast.style.color="red"
//             toastBox.appendChild(toast);
//             toast.appendChild(close)
//             close.addEventListener("click",()=>{
//                 toast.remove();
//               })
//           }
//           showToast();
//     }
    // else if (username.value !== storage.username || password.value !== storage.password){
    //     // alert("wrong username or password")
    //     function showToast(){
    //         let toast= document.createElement("div");
    //         toast.classList.add("toast");
    //         let close=document.createElement("span")
    //         // close.style.cssText="margin-left:50px ;"
    //         close.innerHTML=`<i class="fa-solid fa-xmark ms-5  " style="color: #787b7d;"></i>`
    //         toast.innerHTML=`<i class="fa-solid fa-circle-exclamation pe-2 pt-1" style="color: #ffa200;font-size:20px"></i>please check from name or password`;
    //         toastBox.appendChild(toast);
    //         toast.appendChild(close)

    //         close.addEventListener("click",()=>{
    //             toast.remove();
    //           })

    //       }
    //       showToast();
    //}else{
        //setTimeout(()=>{
          //  location.href="../index.html"
        //},1000)
    //}
//})

