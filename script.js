// NAVBAR EFFECT

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if(window.scrollY > 50){

    nav.style.background = "rgba(10,10,10,0.88)";

  }else{

    nav.style.background = "rgba(15,15,15,0.65)";

  }

});


// BUTTON

const orderBtn = document.querySelector(".btn1");
const menuBtn = document.querySelector(".btn2");


// POPUP

const popup = document.querySelector("#popup");
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// LOCATION POPUP

const locationPopup = document.querySelector("#locationPopup");

// OPEN LOCATION POPUP

function openLocationPopup(){

  locationPopup.classList.add("show");

}

// CLOSE LOCATION POPUP

function closeLocationPopup(){

  locationPopup.classList.remove("show");

}

// OPEN LOCATION

function openLocation(url){

  window.open(url, '_blank');

  closeLocationPopup();

}

// CLOSE POPUP WHEN CLICK OUTSIDE

locationPopup.addEventListener("click", (e) => {

  if(e.target === locationPopup){

    closeLocationPopup();

  }

});


// ORDER BUTTON

if(orderBtn){

  orderBtn.addEventListener("click", () => {

    popup.classList.add("show");

  });

}


// CANCEL BUTTON

cancelBtn.addEventListener("click", () => {

  popup.classList.remove("show");

});


// CONFIRM BUTTON

confirmBtn.addEventListener("click", () => {

  popup.classList.remove("show");

  const contact = document.querySelector("#contact");

  contact.scrollIntoView({
    behavior:"smooth"
  });

});


// MENU BUTTON

if(menuBtn){

  menuBtn.addEventListener("click", () => {

    const menu = document.querySelector(".menu");

    menu.scrollIntoView({
      behavior:"smooth"
    });

  });

}