//Search btn function
const searchPhone = () => {
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
    }
      else {
        document.getElementById('message').style.display = 'none';
        if (phones.length >= 20 || phones.length < 20) {
          SearchResult.innerHTML = '';
          const part = phones.slice(0, 20);
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
  <div class="card h-100 w-100 p-2 ">
  <img src="${phone.image}" class="card-img-top img-fluid w-25" alt="...">
  
  <div class="card-body d-flex flex-column align-items-center container-sm">
    <p class="card-text fw-bolder text-primary">Brand:${phone.brand}</p>
    <h5 class="card-title text-primary">Phone Name:${phone.name}</h5>
    <u class="card-text fw-bolder text-primary">Release Date:${phone.releaseDate ? phone.releaseDate : 'Release Date Not Available!'}</u>
    <p class="card-text fw-bolder text-primary">Storage:${phone.mainFeatures.storage}</p>
    <p class="card-text fw-bolder text-primary">Memory:${phone.mainFeatures.memory}</p>
    <p class="card-text fw-bolder text-primary">Display:${phone.mainFeatures.displaySize}</p>
    <p class="card-text fw-bolder text-primary">Chipset:${phone.mainFeatures.chipSet}</p>
    <p class="card-text text-break fw-bolder text-primary">Sensor:${phone.mainFeatures.sensors}
    <p class="card-text text-break fw-bolder text-primary">WLAN:${phone.others.WLAN}
    <p class="card-text text-break fw-bolder text-primary">Bluetooth:${phone.others.Bluetooth}
    <p class="card-text text-break fw-bolder text-primary">GPS:${phone.others.GPS}
    <p class="card-text text-break fw-bolder text-primary">NFC: ${phone.others.NFC} Radio: ${phone.others.Radio}
    <p class="card-text text-break fw-bolder text-primary">${phone.others.USB}
    
  </div>   
</div>`;
phoneDetails.appendChild(div);
}

