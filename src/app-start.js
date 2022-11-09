var debounce = require("lodash.debounce");

const API_KEY = "5b3ce3597851110001cf62487acc6af265804ad99a403e145821be1a";
const ANOTHER_PARAMS_API_URL =
  "focus.point.lon=19.846570115898984&focus.point.lat=50.10754511537663&boundary.country=PL";
const OPENROUTE_API_URL_AUTOCOMPLETE = "https://api.openrouteservice.org/geocode/autocomplete";
const OPENROUTE_API_URL_DIRECTIONS = "https://api.openrouteservice.org/v2/directions/driving-car";
//?api_key=5b3ce3597851110001cf62487acc6af265804ad99a403e145821be1a&start=19.958665,50.082626&end=19.634936,50.132946
const DEBOUNCE_DELAY = 1000;

const searchBoxForm = document.querySelector(".form-driver");
// console.log(searchBoxForm.localityZone3.previousElementSibling);
const coordinatesLatLonEnd = [];
const coordinatesLatLonStart = [];
const noticeTitle = document.querySelector(".form-driver__notice");
//-------------------------------------------START VARIABLES------------------------------------------------
// const searchResultsStart = document.getElementById("form-driver__route-start-list");
const searchResultsStart = document.querySelector(".form-driver__route-start-list");
const choiceLabelStart = document.querySelector(".form-driver__route-start-choise-label");
// const divStartSpace = document.querySelector(".form-driver__input-space");
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------------END VARIABLES------------------------------------------------
const searchResultsEnd = document.querySelector(".form-driver__route-end-list");
const choiceLabelEnd = document.querySelector(".form-driver__route-end-choise-label");
// const divEndSpace = document.querySelector(".form-driver__input-space");
//----------------------------------------------------------------------------------------------------------

const placesOnRouteZone1DIV = document.querySelector(".form-driver__places-on-route-space-zone1");
const placesOnRouteZone2DIV = document.querySelector(".form-driver__places-on-route-space-zone2");
const placesOnRouteZone3DIV = document.querySelector(".form-driver__places-on-route-space-zone3");

//---------------------ROUNDING METHOD--------------------------
function roundingMethodToSecPlace(value){
  let roundingValue = Number(Math.round(value + 'e+2') + 'e-2');
  return roundingValue
};
//--------------------------------------------------------------

// ---------------------------ROUTE STRART & END LISTENER---------------------------------
searchBoxForm.addEventListener(
  "input",
  debounce((e) => {
    let eventForm = e;
    // if (!searchBoxForm.start.value) {
    //   return
    // }
    //-----------------values input------------------------------------
    let searchBoxStartValue = searchBoxForm.start.value.trim();
    let searchBoxEndValue = searchBoxForm.end.value.trim();
    //------------------------------------------------------------------

    // console.log(searchBoxStartValue, searchBoxEndValue);
    
    fetchOpenrouteAutocomplete(searchBoxStartValue,searchBoxEndValue,eventForm);
    
  }, DEBOUNCE_DELAY)
);
//------------------------------------------------------------------------------

async function fetchOpenrouteAutocomplete(valueInputStart, valueInputEnd, eventForm){
  console.log(eventForm);
  try {
    // if (valueInputStart.length<=2) {
    //   return
    // }
    const params = new URLSearchParams({
      api_key: API_KEY,
      text: valueInputStart+valueInputEnd,
    });
    if(eventForm.target.name === "start" || eventForm.target.name === "end"){
      let fetchUrl = OPENROUTE_API_URL_AUTOCOMPLETE + "?" + params + "&" + ANOTHER_PARAMS_API_URL;
      const response = await fetch(fetchUrl);
      const places = await response.json();

      console.log(places.features);
      if(eventForm.target.id === "form-driver__route-start"){
        createResultsTagStart(places);
      };
      if(eventForm.target.id === "form-driver__route-end"){
        createResultsTagEnd(places);
      };
    };
    // if(searchBoxForm.start.value.length>0 && searchBoxForm.end.value.length>0){
     searchBoxForm.addEventListener("click", handlingSearchedResults); 
    
    
  } catch (error) {
    console.log(error);
  }
};

//----------------------------CREATE TAGS START & END METHODS--------------------------------
function createResultsTagStart(places){
  let resultTagsHTML = "";
  places.features.map((place)=>{
    resultTagsHTML += `
    <p class="search-results-start__content-list" data-place="&#8194;${place.properties.label}" data-lat="${place.geometry.coordinates[0]}" data-lon="${place.geometry.coordinates[1]}" style="cursor:pointer;">
    &#187;&#8194;${place.properties.label}
    </p>
    ` 
  });
  searchResultsStart.innerHTML = resultTagsHTML;
  console.log(searchResultsStart);
};
function createResultsTagEnd(places){
  let resultTagsHTML = "";
  places.features.map((place)=>{
    resultTagsHTML += `
    <p class="search-results-end__content-list" data-place="&#8194;${place.properties.label}" data-lat="${place.geometry.coordinates[0]}" data-lon="${place.geometry.coordinates[1]}" style="cursor:pointer;">
    &#187;&#8194;${place.properties.label}
    </p>
    ` 
  });
  searchResultsEnd.innerHTML = resultTagsHTML;
  console.log(searchResultsEnd);
};
//--------------------------------------------------------------------------------------

function handlingSearchedResults(evt){
  if (evt.target.className === "search-results-start__content-list"){
    let event = evt;
    createOneResultTagStart(event);
  };
  if (evt.target.className === "search-results-end__content-list"){
    let event = evt;
    createOneResultTagEnd(event);
  };
  if(evt.target.className === "delete-my-choise-start"){
    deleteMyAllChoiseStart()
  };
  if(evt.target.className === "delete-my-choise-end"){
    deleteMyAllChoiseEnd()
  };
  // searchBoxForm.removeEventListener("click", handlingSearchedResults);
  // searchBoxForm.removeEventListener("input", fetchOpenrouteAutocomplete);
  let event = evt;
  if(coordinatesLatLonStart.length === 2 && coordinatesLatLonEnd.length === 2){
    console.log("zaczynamy szukać trasy");
    fetchOpenrouteGetRoute(coordinatesLatLonStart, coordinatesLatLonEnd, event);
  };

  // console.log(coordinatesLatLonStart, coordinatesLatLonEnd);
};

//----------------------------CREATE ONE RESULT TAG START & END METHODS--------------------------------
function createOneResultTagStart(event){
  coordinatesLatLonStart.push(event.target.dataset.lat, event.target.dataset.lon);
  searchBoxForm.start.style.display="none";
  searchBoxForm.start.value = "";
  noticeTitle.style.display="none";
  searchResultsStart.innerHTML = "";
  choiceLabelStart.innerHTML = `<span class="search-results__content">${event.target.dataset.place} &#8194 <span class="delete-my-choise-start" style="cursor:pointer;">Usuń</span></span>`;
  return coordinatesLatLonStart
};
function createOneResultTagEnd(event){
  coordinatesLatLonEnd.push(event.target.dataset.lat, event.target.dataset.lon);
  searchBoxForm.end.style.display="none";
  searchBoxForm.end.value = "";
  noticeTitle.style.display="none";
  searchResultsEnd.innerHTML = "";
  choiceLabelEnd.innerHTML = `<span class="search-results__content">${event.target.dataset.place} &#8194 <span class="delete-my-choise-end" style="cursor:pointer;">Usuń</span></span>`;
  return coordinatesLatLonEnd
};

//----------------------------DELETE ALL RESULT TAGS START & END METHODS-------------------------------
function deleteMyAllChoiseStart(){
  searchBoxForm.start.style.display="inline";
  noticeTitle.style.display="inline";
  searchBoxForm.start.value="";
  choiceLabelStart.innerHTML = "";
  coordinatesLatLonStart.splice(0,2);
  searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone3.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone3.parentNode.parentNode.style.display="none";
  placesOnRouteZone1DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone2DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone3DIV.parentNode.parentNode.style.display="none";
};
function deleteMyAllChoiseEnd(){
  searchBoxForm.end.style.display="inline";
  noticeTitle.style.display="inline";
  searchBoxForm.end.value="";
  choiceLabelEnd.innerHTML = "";
  coordinatesLatLonEnd.splice(0,2);
  searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.departureTimeZone3.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone1.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone2.parentNode.parentNode.style.display="none";
  searchBoxForm.priceZone3.parentNode.parentNode.style.display="none";
  placesOnRouteZone1DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone2DIV.parentNode.parentNode.style.display="none";
  placesOnRouteZone3DIV.parentNode.parentNode.style.display="none";
};
//-----------------------------------------------------------------------------------------------------


//------------------------------------GET ROUTE BETWEEN TWO POINTS--------------------------------------
async function fetchOpenrouteGetRoute(latLonStartArray, latLonEndArray, event){
  // console.log("we are inside fetchOpenrouteGetRoute");
  // console.log(latLonStartArray,latLonEndArray);
  const paramsTwo = new URLSearchParams({
    api_key: API_KEY,
    start: latLonStartArray,
    end: latLonEndArray
  });

    let fetchUrlTwo = OPENROUTE_API_URL_DIRECTIONS + "?" + paramsTwo;
    const response = await fetch(fetchUrlTwo);
    const routeObj = await response.json();
    console.log(routeObj);
    let routeDistance = roundingMethodToSecPlace((routeObj.features[0].properties.segments[0].distance)/1000);
    let routeDuration = roundingMethodToSecPlace((routeObj.features[0].properties.segments[0].duration)/60);
    let placesOnRoute = routeObj.features[0].properties.segments[0].steps.map(place => {return place.name});
    console.log("odległość: ", routeDistance);
    console.log("czas dojazdu: ", routeDuration);
    console.log("Miejsca na trasie: ", placesOnRoute);
    if(routeDistance < 10){
      searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone1.parentNode.parentNode.style.display="inline";
      placesOnRouteZone1DIV.parentNode.parentNode.style.display="inline";
    };
    if(routeDistance >= 10 && routeDistance < 20){
      searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone2.parentNode.parentNode.style.display="inline";
      placesOnRouteZone1DIV.parentNode.parentNode.style.display="inline";
      placesOnRouteZone2DIV.parentNode.parentNode.style.display="inline";
    };
    if(routeDistance >= 20){
      searchBoxForm.departureTimeZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.departureTimeZone2.parentNode.parentNode.style.display="inline";
      searchBoxForm.departureTimeZone3.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone1.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone2.parentNode.parentNode.style.display="inline";
      searchBoxForm.priceZone3.parentNode.parentNode.style.display="inline";
      placesOnRouteZone1DIV.parentNode.parentNode.style.display="inline";
      placesOnRouteZone2DIV.parentNode.parentNode.style.display="inline";
      placesOnRouteZone3DIV.parentNode.parentNode.style.display="inline";
    };

    let increasingRouteDistance = 0;
    let placesOnRouteMarkupZone1 = "";
    let placesOnRouteMarkupZone2 = "";
    let placesOnRouteMarkupZone3 = "";
    routeObj.features[0].properties.segments[0].steps.map(step => {
      increasingRouteDistance += (step.distance)/1000;

      if(increasingRouteDistance < 10){
        if(step.name !== "-"){
        placesOnRouteMarkupZone1 += `<span>${step.name}&#8194;&#10509;&#8194;</span>` 
        }
      };
      if(increasingRouteDistance >= 10 && increasingRouteDistance < 20){
        if(step.name !== "-"){
          placesOnRouteMarkupZone2 += `<span>${step.name}&#8194;&#10509;&#8194;</span>`
        }      
      };
      if(increasingRouteDistance >= 20){
        if(step.name !== "-"){
          placesOnRouteMarkupZone3 += `<span>${step.name}&#8194;&#10509;&#8194;</span>`
        }
      };
    });
    placesOnRouteZone1DIV.innerHTML = placesOnRouteMarkupZone1;
    placesOnRouteZone2DIV.innerHTML = placesOnRouteMarkupZone2;
    placesOnRouteZone3DIV.innerHTML = placesOnRouteMarkupZone3;
    

}
//------------------------------------------------------------------------------------------------------

