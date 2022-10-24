var debounce = require('lodash.debounce');

const OPENROUTE_API_URL = "https://api.openrouteservice.org/geocode/search/structured";
const API_KEY = "5b3ce3597851110001cf62487acc6af265804ad99a403e145821be1a";
const ANOTHER_PARAMS_API_URL = "focus.point.lon=19.846570115898984&focus.point.lat=50.10754511537663&boundary.country=PL";
const DEBOUNCE_DELAY = 1000;

const searchBoxForm = document.querySelector(".search-box-form");
const contentBox = document.querySelector(".content");

class ChosenPlaceObject {
  constructor(label, region, coordinatesLat, coordinatesLon ){
    this.label=label,
    this.region=region,
    this.coordinatesLat=coordinatesLat,
    this.coordinatesLon=coordinatesLon
  }
};

searchBoxForm.addEventListener("input", debounce(()=>{
  let searchBoxTownValue = searchBoxForm.town.value.trim();
  let searchBoxStreetValue = searchBoxForm.street.value.trim();
  console.log(searchBoxTownValue, searchBoxStreetValue);
  fetchOpenroute(searchBoxTownValue, searchBoxStreetValue);
}, DEBOUNCE_DELAY));

function fetchOpenroute(town ,address){
  const params = new URLSearchParams({
    api_key: API_KEY,
    address: address,
    locality: town
  })
  let fetchUrl = OPENROUTE_API_URL+"?"+params+"&"+ANOTHER_PARAMS_API_URL;
  console.log(fetchUrl);
  fetch(fetchUrl)
  .then((response)=>{
    if(!response.ok){
      throw new Error(response.status)
    }
    return response.json()
  })
  .then((data)=>{
    console.log(data);
    
    data.features.forEach((place)=>{
      const chosenPlaceObject = new ChosenPlaceObject(place.properties.label, place.properties.region, place.geometry.coordinates[0], place.geometry.coordinates[1]);
      console.log(chosenPlaceObject);
    })
  })
  .catch((error)=>{
    console.log(error);
  })
};




// const objJson = 
// {
//   "geocoding": {
//       "version": "0.2",
//       "attribution": "https://openrouteservice.org/terms-of-service/#attribution-geocode",
//       "query": {
//           "parsed_text": {
//               "city": "krzeszowice",
//               "state": "Małopolskie"
//           },
//           "size": 10,
//           "private": false,
//           "boundary.country": [
//               "POL"
//           ],
//           "lang": {
//               "name": "Polish",
//               "iso6391": "pl",
//               "iso6393": "pol",
//               "via": "header",
//               "defaulted": false
//           },
//           "querySize": 20
//       },
//       "engine": {
//           "name": "Pelias",
//           "author": "Mapzen",
//           "version": "1.0"
//       },
//       "timestamp": 1666429263978
//   },
//   "type": "FeatureCollection",
//   "features": [
//       {
//           "type": "Feature",
//           "geometry": {
//               "type": "Point",
//               "coordinates": [
//                   19.633891,
//                   50.137178
//               ]
//           },
//           "properties": {
//               "id": "101824889",
//               "gid": "whosonfirst:locality:101824889",
//               "layer": "locality",
//               "source": "whosonfirst",
//               "source_id": "101824889",
//               "name": "Krzeszowice",
//               "confidence": 1,
//               "match_type": "exact",
//               "accuracy": "centroid",
//               "country": "Polska",
//               "country_gid": "whosonfirst:country:85633723",
//               "country_a": "POL",
//               "region": "małopolskie",
//               "region_gid": "whosonfirst:region:85687291",
//               "region_a": "MA",
//               "county": "Krakowski",
//               "county_gid": "whosonfirst:county:102079541",
//               "localadmin": "Gmina Krzeszowice",
//               "localadmin_gid": "whosonfirst:localadmin:1125324029",
//               "locality": "Krzeszowice",
//               "locality_gid": "whosonfirst:locality:101824889",
//               "continent": "Europa",
//               "continent_gid": "whosonfirst:continent:102191581",
//               "label": "Krzeszowice, MA, Polska",
//               "addendum": {
//                   "concordances": {
//                       "gn:id": 3094490,
//                       "gp:id": 24548729,
//                       "pl-gugik:jpt_kod_je": "120606_4",
//                       "qs_pg:id": 1043171,
//                       "wd:id": "Q146509",
//                       "wk:page": "Krzeszowice"
//                   }
//               }
//           },
//           "bbox": [
//               19.591344703,
//               50.127924294,
//               19.670523209,
//               50.164094178
//           ]
//       },
//       {
//           "type": "Feature",
//           "geometry": {
//               "type": "Point",
//               "coordinates": [
//                   19.633531,
//                   50.096902
//               ]
//           },
//           "properties": {
//               "id": "1477865797",
//               "gid": "whosonfirst:locality:1477865797",
//               "layer": "locality",
//               "source": "whosonfirst",
//               "source_id": "1477865797",
//               "name": "Krzeszowice Obszar Wiejski",
//               "confidence": 1,
//               "match_type": "exact",
//               "accuracy": "centroid",
//               "country": "Polska",
//               "country_gid": "whosonfirst:country:85633723",
//               "country_a": "POL",
//               "region": "małopolskie",
//               "region_gid": "whosonfirst:region:85687291",
//               "region_a": "MA",
//               "county": "Krakowski",
//               "county_gid": "whosonfirst:county:102079541",
//               "localadmin": "Gmina Krzeszowice",
//               "localadmin_gid": "whosonfirst:localadmin:1125324029",
//               "locality": "Krzeszowice Obszar Wiejski",
//               "locality_gid": "whosonfirst:locality:1477865797",
//               "continent": "Europa",
//               "continent_gid": "whosonfirst:continent:102191581",
//               "label": "Krzeszowice Obszar Wiejski, MA, Polska",
//               "addendum": {
//                   "concordances": {
//                       "pl-gugik:jpt_kod_je": "120606_5"
//                   }
//               }
//           },
//           "bbox": [
//               19.520387717,
//               50.061769388,
//               19.716678598,
//               50.201964546
//           ]
//       }
//   ],
//   "bbox": [
//       19.520387717,
//       50.061769388,
//       19.716678598,
//       50.201964546
//   ]
// }

//   const object = JSON.stringify(objJson);
//   const object2 = JSON.parse(object);
//   console.log(object2);
//   console.log(object2.features);

//   {
//     "label": "Tadeusza Kościuszki, Krzeszowice, MA, Polska",
//     "region": "małopolskie",
//     "coordinatesLat": 19.634936,
//     "coordinatesLon": 50.132946
// }

// let request = new XMLHttpRequest();

// request.open('POST', "https://api.openrouteservice.org/v2/matrix/driving-car");

// request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
// request.setRequestHeader('Content-Type', 'application/json');
// request.setRequestHeader('Authorization', '5b3ce3597851110001cf62487acc6af265804ad99a403e145821be1a');

// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }
// };

// const body = '{"locations":[[19.634936,50.132946],[19.846570115898984,50.10754511537663]],"metrics":["distance"],"units":"km"}';

// request.send(body);
