// var debounce = require("lodash.debounce");

// const API_KEY = "5b3ce3597851110001cf62487acc6af265804ad99a403e145821be1a";
// const ANOTHER_PARAMS_API_URL =
//   "focus.point.lon=19.846570115898984&focus.point.lat=50.10754511537663&boundary.country=PL";
//   const OPENROUTE_API_URL_AUTOCOMPLETE = "https://api.openrouteservice.org/geocode/autocomplete";
// const DEBOUNCE_DELAY = 1000;

// const searchBoxForm = document.getElementById("qqqqqqq")
// //---------------------------------------------END VARIABLES-------------------------------------------------
// const searchResultsDivEndTitleTown = document.querySelector(".search-results-end__title-space-town");
// const searchResultsDivEndTitleStreet = document.querySelector(".search-results-end__title-space-street")
// const searchResultsDivEndTown = document.querySelector(".search-results-end__town");
// const searchResultsDivEndStreet = document.querySelector(".search-results-end__street");
// // console.log(searchResultsDivEndTitleTown,searchResultsDivEndTitleStreet,searchResultsDivEndTown,searchResultsDivEndStreet);
// //-----------------------------------------------------------------------------------------------------------

// //---------------------------ROUTE END LISTENER---------------------------------
// searchBoxForm.addEventListener(
//     "input",
//     debounce(() => {
//       // if (!searchBoxForm.start.value) {
//       //   return
//       // }
//       let searchBoxEndTownValue = searchBoxForm.end.value.trim();
//       let searchBoxEndStreetValue = searchBoxForm.end_street.value.trim();
//       console.log(searchBoxEndTownValue, searchBoxEndStreetValue);
//       // fetchOpenrouteAutocomplete(searchBoxStartTownValue,searchBoxStartStreetValue);
//     }, DEBOUNCE_DELAY)
//   );
//   //------------------------------------------------------------------------------

// //===================================PART OF ROUTE END===========================================
// const fetchOpenrouteAutocomplete = async (inputStartValueTown, inputStartValueStreet) =>{
//     try {
//       await fetchOpenrouteAutocompleteTown(inputStartValueTown);
//       await fetchOpenrouteAutocompleteStreet(inputStartValueStreet);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   async function fetchOpenrouteAutocompleteTown(inputStartValueTown) {
//     try {
//       if (inputStartValueTown.length<=2) {
//         return
//       }
//       const params = new URLSearchParams({
//         api_key: API_KEY,
//         text: inputStartValueTown,
//         layers: "locality"
//       });
//       let fetchUrl = OPENROUTE_API_URL_AUTOCOMPLETE + "?" + params + "&" + ANOTHER_PARAMS_API_URL;
//       const response = await fetch(fetchUrl);
//       const places = await response.json();
//       console.log(places.features);
//       searchResultsDivStartTitleTown.innerHTML = `<span class="search-results__title-town">Wybierz pasującą miejscowość</span>`;
//       createResultsTagsTown(places);
//       searchResultsDivStartTown.addEventListener("click", handlingResultsTagTown);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   async function fetchOpenrouteAutocompleteStreet(inputStartValueStreet){
//     try {
//       if (inputStartValueStreet.length<=2) {
//         return
//       }
//       const params = new URLSearchParams({
//         api_key: API_KEY,
//         text: inputStartValueStreet,
//         layers: "street"
//       });
//       let fetchUrl = OPENROUTE_API_URL_AUTOCOMPLETE + "?" + params + "&" + ANOTHER_PARAMS_API_URL;
//       const response = await fetch(fetchUrl);
//       const places = await response.json();
//       console.log(places.features);
//       searchResultsDivStartTitleStreet.innerHTML = `<span class="search-results__title-street">Wybierz pasującą ulicę</span>`;
//       searchResultsDivStartTitleTown.innerHTML = "";
//       createResultsTagsStreet(places);
//       searchResultsDivStartStreet.addEventListener("click", handlingResultsTagStreet);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   //---------------------------------------------------START TOWN--------------------------------------------------
//   //---------insert to DOM to the "search-results-start" class max 10 places to the next choice
//   function createResultsTagsTown(places){
//     let resultTagsHTML = "";
//     places.features.map((place)=>{
//       resultTagsHTML += `
//       <p class="search-results__content" data-town="${place.properties.locality}" style="cursor:pointer;">
//       &#187;&#8194;${place.properties.name}&#8194;${place.properties.locality}&#8194;${place.properties.region}
//       </p>
//       ` 
//     });
//     searchResultsDivStartTown.innerHTML = resultTagsHTML;
//   };
  
//   //---------insert to DOM to the "search-results-start" class only one place and allows you to narrow down your search results
//   function handlingResultsTagTown(evt){
//     if (evt.target.nodeName === "P"){
//       let event = evt;
//       createOneResultsTagsTown(event)
//     };
//     if(evt.target.className === "delete-my-choise"){
//       deleteMyAllChoise()
//     }
//   };
//   function createOneResultsTagsTown(event){
//     searchBoxForm.start.style.display="none";
//     searchBoxForm.start.value = "";
//     searchBoxForm.start_street.style.display="inline";
//     searchResultsDivStartTitleTown.innerHTML = `<span class="search-results__title-town">Możesz sprecyzować wybór wpisując nazwę ulicy</span>`;
//     searchResultsDivStartTown.innerHTML = `<span class="search-results__content">${event.target.dataset.town} &#8194 <span class="delete-my-choise" style="cursor:pointer;">Usuń</span></span>`;
//     return
//   };
  
//   function deleteMyAllChoise(){
//     searchResultsDivStartTown.innerHTML = "";
//     searchResultsDivStartStreet.innerHTML = "";
//     searchResultsDivStartTitleTown.innerHTML = "";
//     searchResultsDivStartTitleStreet.innerHTML = "";
//     searchBoxForm.start.style.display="inline";
//     searchBoxForm.start_street.style.display="none";  
//     searchBoxForm.start.value="";
//     searchBoxForm.start_street.value="";
//     return
//   };
//   //-----------------------------------------------------------------------------------------------------------------
  
  
//   //---------------------------------------------------START STREET--------------------------------------------------
//   //---------insert to DOM to the "search-results-start" class max 10 streets to the next choice---------------------
//   function createResultsTagsStreet(places){
//     let resultTagsHTML = "";
//     places.features.map((place)=>{
//       resultTagsHTML += `
//       <p class="search-results__content" data-street="${place.properties.street}" style="cursor:pointer;">
//       &#187;&#8194;${place.properties.name}
//       </p>
//       ` 
//     });
//     searchResultsDivStartStreet.innerHTML = resultTagsHTML;
  
//   };
  
//   //---------insert to DOM to the "search-results-start" class only one place and allows you to narrow down your search results
//   function handlingResultsTagStreet(evt){
//     if (evt.target.nodeName === "P"){
//       let event = evt;
//       createOneResultsTagsStreet(event)
//     };
//     if(evt.target.className === "delete-my-choise"){
//       deleteMyStreetChoise()
//     }
//   };
//   function createOneResultsTagsStreet(event){
//     searchBoxForm.start_street.style.display="none";
//     searchResultsDivStartStreet.innerHTML = `<span class="search-results__content">${event.target.dataset.street} &#8194 <span class="delete-my-choise" style="cursor:pointer;">Usuń</span></span>`;
//     searchResultsDivStartTitleStreet.innerHTML = "";
//     return
//   };
//   function deleteMyStreetChoise() {
//     searchResultsDivStartStreet.innerHTML = "";
//     searchResultsDivStartTitleTown.innerHTML = `<span class="search-results__title-town">Możesz sprecyzować wybór wpisując nazwę ulicy</span>`;
//     searchBoxForm.start_street.style.display="inline";  
//     searchBoxForm.start.value="";
//     searchBoxForm.start_street.value="";
//     return
//   }
//   //-----------------------------------------------------------------------------------------------------------------
//   //=========================================================================================================================