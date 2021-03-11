'use strict';
let currentData = [];

function renderDataCards(data){
    let mainBody = document.querySelector('#mainBody');
    mainBody.innerHTML = '';
    data.forEach((element) => {
        mainBody.appendChild(renderEachCard(element));
    });
}

function renderEachCard(data){
    let colDiv = document.createElement('div');
    colDiv.classList.add("col-sm-12", "col-md-6", "col-xl-4", "d-flex")

    let cardDiv = document.createElement('div');
    cardDiv.classList.add("card", "mb-4", "shadow-sm");

    let countryImg = document.createElement("img");
    countryImg.classList.add("card-img");
    countryImg.src = "img/" + data.image;
    countryImg.alt = data.alt;

    let cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add("card-body", "container");

    let  countryNameRowdiv = document.createElement('div');
    countryNameRowdiv.classList.add("row");

    let countryName = document.createElement('h2');
    countryName.classList.add("card-title");
    countryName.textContent = data.name;

    countryNameRowdiv.appendChild(countryName);

    //hover view 
    let hoverCardDiv = document.createElement('div');
    hoverCardDiv.classList.add("hover-card");

    // criminal index in hover view 
    let criminalIndexCategory = document.createElement('p');
    criminalIndexCategory.classList.add('category');
    criminalIndexCategory.textContent = "Criminal Index: ";

    let criminalValue = document.createElement('span');
    criminalValue.classList.add("type", "ci");
    criminalValue.textContent = data.criminalIndex;

    criminalIndexCategory.appendChild(criminalValue);

    // saftey index in hover view 
    let safteyIndexCategory = document.createElement('p');
    safteyIndexCategory.classList.add('category');
    safteyIndexCategory.textContent = "Saftey Index: ";

    let safteyValue = document.createElement('span');
    safteyValue.classList.add("type", "si");
    safteyValue.textContent = data.safteyIndex;

    safteyIndexCategory.appendChild(safteyValue);

    // price in hover view 
    let priceCategory = document.createElement('p');
    priceCategory.classList.add('category');
    priceCategory.textContent = "Average Cost for 7-day Solo Trip: ";

    let priceValue = document.createElement('span');
    priceValue.classList.add("type", "price");
    priceValue.textContent = data.price;

    priceCategory.appendChild(priceValue);

    // append to create the card
    cardBodyDiv.append(countryNameRowdiv);
    hoverCardDiv.append(criminalIndexCategory, safteyIndexCategory, priceCategory);
    cardDiv.append(countryImg, cardBodyDiv, hoverCardDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

// function is storing all the data for each of the countries 
// storing the data that goes on each card 
fetch('data/countries.json')
    .then(function(res) { return res.json() })
    .then(function(data) {
        currentData = data;
    renderDataCards(currentData);
    })


function resetCardsDisplayed(){
    renderDataCards(currentData);
}

resetCardsDisplayed();


// search feature 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.querySelector('#textSearch')
        .addEventListener('click', function(){
            let data = currentData;
            let userInput = document.querySelector('#inputVal').value;
            userInput = capitalizeFirstLetter(userInput);
            let filteredData = data.filter(countryInfo => countryInfo.name.includes(userInput));
            renderDataCards(filteredData);
        
            if (filteredData.length === 0) {
                renderError(new Error("No results found"));
            }
        });

// sort alphabetically 
function dynamicSort(property) {
    // credits to https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

// sorts criminalIndexs in data array from lowest to highest
function criminalIndexFilter(){
    let data = currentData;
    let sortedData = data.sort((a, b) =>  parseFloat(a.criminalIndex) - parseFloat(b.criminalIndex));
    return sortedData;
}

// sorts safteyIndex in data array from highest to lowest 
function safteyIndexFilter(){
    let data = currentData;
    let sortedData = data.sort((a, b) => parseFloat(b.safteyIndex) - parseFloat(a.safteyIndex));
    return sortedData;
}

// sorts prices in data array from lowest to highest
function priceFilter(){
    let data = currentData;
    let sortedData = data.sort((a, b) =>  parseFloat(a.priceNum) - parseFloat(b.priceNum));
    return sortedData;
}

//sort data by the different filters clicked 
document.querySelector('#inputSort')
        .addEventListener('change', (event) => {
            if (event.target.value === "sortName"){
                let sortedData = currentData.sort(dynamicSort("name"));
                renderDataCards(sortedData);
            } else if (event.target.value === 'sortCrime'){
                renderDataCards(criminalIndexFilter());
            } else if (event.target.value === 'sortSaftey'){
                renderDataCards(safteyIndexFilter());
            } else if (event.target.value === 'sortPrice'){
                renderDataCards(priceFilter());
            }
        });

// reset button 
document.querySelector('#resetAll')
        .addEventListener('click', function(){
            resetCardsDisplayed();
        });

// hamburger menu 
const hamburger = document.getElementById("hamburger");
const navUL = document.getElementById("nav-ul");

hamburger.addEventListener("click", function() {
    navUL.classList.toggle("show");
    hamburger.classList.toggle("showClose");
})

// error handling 
function renderError(error) {
    let message = document.createElement('p');
    message.classList.add('alert');
    message.classList.add('alert-danger'); 
    message.textContent = error.message; 
  
    document.querySelector('#mainBody').appendChild(message); 
}

