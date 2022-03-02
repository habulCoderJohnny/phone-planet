const spinner = document.getElementById('spinner'); //get spinner Id 
//Search btn function
const searchPhone = () => {
  spinner.style.display = "block"; //loading spinner display Block;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value;
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(json => displaySearchResult(json.data))
    searchField.value = '';
  }
  // displaySearchResult function & loope 
  const displaySearchResult = (phones) => {
    const SearchResult = document.getElementById('search-result');
    SearchResult.textContent = ''; //← ← clear previous search result
    if (phones.length == '') {
      document.getElementById('message').style.display = 'block';
      spinner.style.display = "none";
    }
      else {
        document.getElementById('message').style.display = 'none';
        if (phones.length >= 20 || phones.length < 20) {
          SearchResult.innerHTML = '';
          const part = phones.slice(0, 20); // only 20 item display
          part?.forEach(phone => {
          const div = document.createElement('div');
       div.classList.add('col');
        div.innerHTML =
        `
        <div class="card h-auto d-flex flex-column align-items-center ">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column align-items-start ">
          <h5 class="card-title text-primary">Phone Name: ${phone.phone_name}</h5>
          <p class="card-text fw-bolder text-primary">Brand: ${phone.brand}</p>
          <div class="text-center">
          <button onclick="loadPhoneById('${phone.slug}')" type="button" class="btn btn-primary ">Details</button></div>
        </div>
      </div> `;
      SearchResult.appendChild(div);
      spinner.style.display = "none";
    })
  }
}

} 

// get phone-Id | get phone details    
const loadPhoneById = phoneId => {
  // console.log(phoneId);
  const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
  .then(response => response.json())
  .then(json => displayPhoneById(json.data))
}

// phone details part |get id| create div, add card and phone details
const displayPhoneById = phone => {
  // console.log(phone);
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.textContent = ''; //← ← clear previous phone details
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
<div class="card h-100 w-100 p-2">
    <img src="${phone.image}" class="card-img-top img-fluid w-25" alt="...">
<div class="card-text fw-bolder text-primary">
   <div class="card-body card-text fw-bolder text-primary d-flex flex-column align-items-center container-sm">
    <p>Brand:${phone.brand}</p>
    <h5 class="card-title text-danger">Phone Name:${phone.name}</h5>
    <u>Release Date:${phone.releaseDate ? phone.releaseDate : 'Release Date Not Available!'}</u>
    <p>Storage:${phone.mainFeatures.storage}</p> 
    <p>Memory:${phone.mainFeatures.memory}</p>
    <p>Display:${phone.mainFeatures.displaySize}</p>
    <p>Chipset:${phone.mainFeatures.chipSet}</p>
    <p class="text-break">Sensor:${phone.mainFeatures.sensors}</p>
    <p class="text-break">WLAN:${phone.others.WLAN}</p>
    <p class="text-break">GPS:${phone.others.GPS}</p>
    <p class="text-break">Bluetooth:${phone.others.Bluetooth}</p>
    <p class="text-break">NFC: ${phone.others.NFC} Radio: ${phone.others.Radio}</p>
    <p class="text-break">${phone.others.USB}</p>  
   </div>   
</div>`;
phoneDetails.appendChild(div);
}


// Main Body Loading Spinner 
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
};