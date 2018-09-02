import {Entities} from 'html-entities'
/*
File containing functions to query the shop.com search and product APIs
*/

const API_KEY = 'l7xxacb5c276f8bc4c6b98e6b7be52896233';
const SEARCH_API_PRE = 'https://api.shop.com/sites/v1/search/term/{term}';
const PROD_API_PRE = 'https://api.shop.com/stores/v1/products/{prodID}?allperms=false';
const SHOP_COM_LINK_PRE = 'https://www.shop.com';

const terms = ['furniture','electronics','vitamins','hiking','kids toys'];

/*
returns the shop.com search API query string

params:
  term:   the term to search for
*/
function getSearchAPIString(term){
  var url = SEARCH_API_PRE.replace(/{term}/g, encodeURIComponent(term));
  url = url + "?" + "apikey=" + encodeURIComponent(API_KEY) + "&count=100";
  return url;
}

/*
returns the shop.com product API query string

params:
  prodID:   the product ID to search for
*/
function getProdAPIString(prodID){
  var url = PROD_API_PRE.replace(/{prodID}/g, encodeURIComponent(prodID));
  url = url + "&" + "apikey=" + encodeURIComponent(API_KEY);
  return url;
}

/*
fetches the data used for the game using the shop.com search API

params:
  callback:   callback function called when the API call returns
*/
export function fetchGameData(callBack){
  term = terms[Math.floor(Math.random() * terms.length)];
  fetch(getSearchAPIString(term))
  .then((response) => response.json())
  .then((responseJson) => {
        var formattedData = assembleData(responseJson);
        callBack(formattedData)
      })
  .catch((error)=> {
    callBack([])
  });
}

/*
fetches the shop.com product link for a given product ID using the shop.com product API

params:
  prodId:     the product ID to get the link for
  callback:   callback function called when the API call returns
*/
export function fetchProdLink(prodID, callBack){
  fetch(getProdAPIString(prodID))
  .then((response) => response.json())
  .then((responseJson) => {
        var shopComLinkURI = SHOP_COM_LINK_PRE + responseJson.productLink.href;
        callBack(shopComLinkURI)
      })
  .catch((error)=> {
    callBack("")
  });
}

/*
assembles an array of 10 objects using the data returned form the shop.com search API
the data passed in has 50 items; this function picks 10 acceptablty formatted ones and puts the necessary information in an array of objects

params:
  data:   the data returned from the shop.com search API
*/
function assembleData(data){
  var ret = [];
  var indexSet = [];
  while(ret.length < 10){
    var randIndex = Math.floor(Math.random() * data.searchItems.length);
    if(indexSet.includes(randIndex)){
      continue;
    }
    var formattedData = formatData(data.searchItems[randIndex])
    if(Object.keys(formattedData).length == 0) continue;
    ret.push(formattedData);
  }
  return ret;
}

/*
takes in a product returned from the shop.com search api, determines if it is formatted properly, and returns an item containing the relevant extracted data (prodID, imageURI, caption, price, and fakePrice)
return empty object if entry is not formatted adequately

params:
  entry:    the product that should be checked and had its data extracted
*/
function formatData(entry){
  const Entities = require('html-entities').AllHtmlEntities
  const entities = new Entities();
  if(entry.prodId != 0 && 'imageURI' in entry && 'caption' in entry && 'priceInfo' in entry && !(isNaN(entry.priceInfo.price.substring(1)))){
    return {
      prodID: entry.prodID,
      imageURI: entry.imageURI,
      caption: entities.decode(entry.caption),
      price: parseFloat(entry.priceInfo.price.substring(1)),
      fakePrice: getFakePrice(parseFloat(entry.priceInfo.price.substring(1)))
    }
  }
  return {};
}

/*
  given a price returns a fake price that is 15-30% higher or lower than the actual price

  params:
    price: the actual price
*/
function getFakePrice(price){
  var diff = price*((Math.random() * .15) + .15);
  if(Math.random() > 0.5) return price-diff;
  return price + diff;
}
