
// http://localhost:1000/countries

const favoriteNav = JSON.parse(localStorage.getItem("favoriteNav")) || [];
fetch('/countries').then((res)=>res.json())
    .then((countries)=>{
        console.log(countries[0]);
        let row = document.querySelector(".row_in_js");
        countries.forEach(function (country) {
          row.innerHTML += `
            <div class="col-md-6  col-lg-3 country" data-id="${country._id}">
              <div>
                  <img class="img-fluid countryImg ${country.imgCountry}" src="${country.img}">
                  <div class="link-Egypt mt-2 mb-2">
                    <div class="fav-heart d-inline-block m-0 w-0">
                            <span class="Egypt me-1 ms-2"><a class="${
                              country.class
                            }" href="#"><b>${country.name}</b></a></span>
                            ${
                              favoriteNav.find((ele) => ele._id == country._id)
                                ? '<i class="fa-solid fa-heart" style="color: #ff0000; opacity:1; "></i>'
                                : '<i class="fa-solid add-favorite fa-heart"></i>'
                            }
                    </div>
                            <span class="link ms-5 ">
                                <a class="${country.flight} href="#">Flight</a>
                                <span>/</span>
                                <a class="${country.hotel} href="#">Hotel</a>
                                <span>/</span>
                            <a class="${country.car} href="#">Car</a>
                        </span>
                    </div>
              </div>
            </div>
            `;
          addFavorite(countries);
        });
        let countryImage = document.querySelectorAll(".countryImg");
        countryImage.forEach((image)=>{
          image.addEventListener('click', ()=>{
            const countryId = image.parentElement.parentElement.dataset.id
            console.log(countryId);
            location.href = `./country_temp/index_country.html?=${countryId}`
          })
        })
    }).catch((err)=>{
        console.log(err);
    })


let toastBox = document.getElementById("toastBox");


let successLogin = `<i class="fa-solid fa-circle-check pe-2 " style="color: #08e234; font-size:20px"></i>Success log in`;
let addToFavorite = `<i class="fa-solid fa-circle-check pe-2 " style="color: #08e234; font-size:20px"></i> Added to favorite`;
let mustArise = `<i class="fa-solid fa-circle-exclamation pe-2 " style="color: #cd8a18; font-size:20px"></i>A user account must arise`;
let classUser = 'toast-user';
let normalClss = 'toast'

let closeStyleUser = `<i class="fa-solid fa-xmark  " style="color: #787b7d;"></i>`;
let closeStyFavorite = `<i class="fa-solid fa-xmark ms-4 " style="color: #787b7d;"></i>`;
let closeStyleuserSuccess = `<i class="fa-solid fa-xmark ms-5 " style="color: #787b7d;"></i>`;

function showToast(show, classToast, closeStyle) {
  let toast = document.createElement("div");
  toastBox.style.cssText = "position:fixed; top:20px; ";
  toast.classList.add(classToast);
  let close = document.createElement("span");
  toast.style.cssText = "margin-top:50px ; ";
  close.innerHTML = closeStyle;
  toast.innerHTML = show;
  toastBox.appendChild(toast);
  toast.appendChild(close);
  close.addEventListener("click", () => {
    toast.remove();
  });
  setTimeout(() => {
    toast.remove();
  }, 6000);
}

let storage = JSON.parse(localStorage.getItem("userobj"));
// let user = window.location.href.split('?=')[1];
function addFavorite(country) {
  let favorite = document.querySelectorAll(".add-favorite");
  favorite.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!user) {
        showToast(mustArise, classUser, closeStyleUser);
      } else {
        const parent = this.closest(".country");
        const id = parent.dataset.id;
        // console.log(id);
        // console.log(parent);
        const conObj = favoriteNav.find((ele) => {return ele.id == id});
        
        if (!conObj) {
          const countries = country.find((ele) => {return ele._id == id});
          console.log(countries);                 
          console.log(country);
          favoriteNav.push({
            id: countries._id,
            title: countries.name,
            img: countries.img,
          });
          localStorage.setItem("favoriteNav", JSON.stringify(favoriteNav));
          showToast(addToFavorite, normalClss, closeStyFavorite);
        }
        btn.remove();
        parent.querySelector(".fav-heart").innerHTML +=
          '<i class="fa-solid fa-heart" style="color: #ff0000; opacity:1; "></i>';
        // btn.style.cssText="color:red ;opacity: 1 ";
      }
    });
  });
}

let logIn = document.querySelector(".login");
let signIn = document.querySelector(".signin");
let userInfo = document.querySelector(".user-info");
let myUser = document.querySelector(".my-user");
let user = JSON.parse(localStorage.getItem("userobj"));
let logOut = document.querySelector(".logout");



if (user) {
  logIn.remove();
  signIn.remove();
  userInfo.style.display = "block";

  myUser.innerHTML += `
    ${user.username}
    `;
  showToast(successLogin, normalClss, closeStyleuserSuccess);
} else {
  logOut.remove();
  userInfo.remove();
}
logOut.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.open("page_login/page_login.html", "_self");
  }, 1000);
});

// ================(navbar)==========================

let myHotel = document.querySelector(".hotel");
myHotel.onclick = function () {
  location.href = "page_egypt/index_egypt.html#hotel";
};

let myCar = document.querySelector(".car");
myCar.onclick = function () {
  location.href = "page_egypt/index_egypt.html#book-car";
};

let myFlight = document.querySelector(".flight");
myFlight.onclick = function () {
  location.href = "page_egypt/index_egypt.html#flight";
};


let btn = document.querySelector("#bt");
window.onscroll = function () {
  if (window.scrollY >= 400) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

btn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// =================================================
