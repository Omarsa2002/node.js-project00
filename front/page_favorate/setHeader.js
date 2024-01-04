let userx = JSON.parse(localStorage.getItem("userobj"));
const url = `/favorate/${userx._id}`;
const data = { email: window.localStorage.getItem('userobj') };
// Replace 'yourAccessToken' with your actual access token or JWT
const accessToken = JSON.parse(window.localStorage.getItem('token'));
//console.log(accessToken)
// Creating headers with Authorization
const headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Authorization', `Bearer ${accessToken}`);

//console.log(headers.get('Authorization'));
// Making a POST request with fetch
fetch(url, {
    headers: headers,
})
.then(response => response.json())
.then(data => {
    if(data.status !== 'Success'){
        window.localStorage.clear();
        window.location.href = '../page_logIn/page_login.html';
    }
    else{
        localStorage.setItem("favoriteNav", JSON.stringify(data.data));
    }

})
.catch(error => {
    console.error('Error:', error);
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