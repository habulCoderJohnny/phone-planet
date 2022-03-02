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
  const displaySearchResult = (phones) => {
    const SearchResult = document.getElementById('search-result');
  }