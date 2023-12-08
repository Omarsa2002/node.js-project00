


const id = window.location.href.split('=')[1];


console.log(id);

// http://localhost:1000/countries/api/65648cf3e47af432dc4751d5

const url = `/countries/api/${id}`;
console.log(url);

let thisSingleCountry;

const response =fetch(url);
const data = response.then((res)=>res.json());
data.then((country)=>{

    thisSingleCountry =  country.data.thisCountry
    forThisPage(thisSingleCountry);
    let imgClick = document.querySelectorAll('.click');

    const popular = [...thisSingleCountry.the_popular];
    let f = popular[0]
    console.log(popular); 

    imgClick.forEach((img)=>{
        img.addEventListener('click',()=>{
            let ele = popular.find((el)=>{ return el._id === img.id});
            console.log(ele);
            location.href = ele.link;
        });
    });
});

function forThisPage(thisCountry){
    let header = document.querySelector('header');
    header.style.cssText = `background-image: url(${thisCountry.img})`;
    let countryName = document.querySelector('.countryName');
    countryName.innerHTML = thisCountry.name;
    let popularContainer = document.querySelector('.popularContainer');
    thisCountry.the_popular.forEach((popular)=>{

        popularContainer.innerHTML += `
        <div class="col-sm-6 col-md-4">
            <div class="box mb-5">
                <img class="${popular.imgClass}" id="${popular._id}" src="${popular.img}" alt="">
                <a href="${popular.link}">${popular.name}</a>
                <p>${popular.description}</p>
            </div>
        </div>
        `;
    });

    let hotelContainer = document.querySelector('.hotelContainer');
    thisCountry.countryHotels.forEach((hotel)=>{
        let stars = '';
        while(hotel.stars--)
        {
            stars += '<i class="fa-solid fa-star" style="color: #e1ff00;"></i>';
        }
        hotelContainer.innerHTML +=`
        <div class="col-12   ps-0">
            <div class="box d-flex ">
                <img class="img-fluid" src="${hotel.img}" alt="" >
                <div>
                    <p class="mt-1 mb-1 ms-2  fw-bold fs-5 me-1">Fire Mont Nile City</p>
                        <i class="fa-solid fa-location-dot ms-3" style="color: #000000;"></i>
                        ${hotel.city} 
                    <p class="ms-3 mt-2 mb-1">
                        ${hotel.location} 
                    </p>
                    <span class="ms-3 mb-0 ">
                        ${stars}
                        <p class="text-end text-success fw-bold me-3 ms-3 mt-0 mb-0">EGP ${hotel.price}</p>
                    </span>
                    <a class="ms-3 mb-3 d-inline-block" href="${hotel.link}">Show more</a>
                </div>
            </div>
        </div>
        `
    });
    let guidesCountry = document.querySelector('.guidesCountry');
    guidesCountry.innerHTML = `The most famous tour guides in ${thisCountry.name}`
    let guideContainer = document.querySelector('.guideContainer');
    thisCountry.guides.forEach((guide)=>{
        let stars = '';
        while(guide.stars--)
        {
            stars += '<i class="fa-solid fa-star " style="color: #e1ff00;"></i>';
        }
        guideContainer.innerHTML +=`
        <div class="carousel-item  ">
            <div class="container mb-5">
                <div class=" d-flex justify-content-center mb-0">
                <img src="${guide.img}" class="d-block  m-5 mb-1" alt="..."  width="200px" height="200px">
                </div>
                <div class="text-center">
                    <p class="fw-bold mb-0  fs-4">${guide.name}</p>
                    <p class="fs-5 mb-1">Tour guide in ${guide.place}</p>
                    <div>
                        ${stars}
                    </div>
                    <div class="social fs-2">
                        <a href="https://facebook.com"><i class="fa-brands fa-facebook"></i></a>
                        <a href="https://instagram.com"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://twitter.com"><i class="fa-brands fa-twitter"></i></a>
                        <a href="https://linkedin.com"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    let carousel = document.querySelectorAll('.carousel-item');
    carousel[0].classList.add('active');


}


let btn=document.querySelector("#bt")
window.onscroll=function(){
    if(window.scrollY >= 400){
        btn.style.display="block";
    }else{
        btn.style.display="none";
    }
}

btn.onclick=function(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}


let btnHome=document.querySelector(".btn-home")
btnHome.addEventListener("click" , ()=>{
    location.href="../index.html";
})

