// hamburger menu 
const hamburger = document.getElementById("hamburger");
const navUL = document.getElementById("nav-ul");

hamburger.addEventListener("click", function() {
    navUL.classList.toggle("show");
    hamburger.classList.toggle("showClose");
})