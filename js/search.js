'use strict';

// const toggleButn = document.getElementsByClassName('navbar-toggler')[0]
// const navLinks = document.getElementsByClassName('nav-links')[0]

// toggleButn.addEventListener('click', () => {
//     navLinks.classList.toggle('active')
// })
      
let searchCountry = document.querySelector('button');
searchCountry.addEventListener('click', searchFunction);
function searchFunction() {
    let tr; 
    let td;
    let input = document.getElementById("attractionList");
    let searchFor = input.value.toUpperCase();
    let table = document.getElementById("attractionsTable");
    tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(searchFor) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/*var toggle = document.getElementsByClassName("navbar-toggler")[0];
var menu = document.getElementById("#menu");

toggle.onclick = function(){
    var hidden = menu.style.visibility === "hidden";
    menu.style.visibility = hidden ? "visible" : "hidden";
};*/

//Needed for JEST to pass
// console.log(searchFunction())*/

 //let searchCountry = document.querySelector('button');
    //searchCountry.addEventListener('click', searchFunction);
    //let input;
    //let searchFor;
    //let table;

/*function GetSelectedValue(){
    var e = document.getElementById("#attractionList");
    var result = e.options[e.selectedIndex].value;
      
    document.getElementById(".selectedNone").innerHTML = result;
    }
    
    function GetSelectedText(){
    var e = document.getElementById("#attractionsTable");
    var result = e.options[e.selectedIndex].text;
      
    document.getElementById("result").innerHTML = result;
    }*/