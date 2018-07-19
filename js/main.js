'use strict';

var button = document.querySelector('.button-search');
var input = document.querySelector('.input-film');
var containerResults = document.querySelector('.container-results');
var counter = 0;
var filmsArray = [];

function searchFilms() {
  var inputContent = input.value;
  var url = 'http://api.tvmaze.com/search/people?q=';
  fetch(url + inputContent)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJson) {
      console.log(responseJson);
      var arrayFavouritesSaved = JSON.parse(localStorage.getItem("films-array"));

      var ul = document.createElement('ul');
      ul.classList.add("list");
      containerResults.innerHTML = '';
      containerResults.appendChild(ul);
      for (var i = 0; i < responseJson.length; i++) {
        var li = document.createElement('li');
        var title = document.createElement('h2');
        var titleContent = document.createTextNode(responseJson[i].person.name);
        var image = document.createElement('img');
        var country = document.createElement("p");
       
        
        li.classList.add('container-no-favorite');
        li.setAttribute("id", i);
        title.classList.add('film-title');
        title.appendChild(titleContent);
        
        image.classList.add('image-film');
        if(responseJson[i].person.image === null) {
          image.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          image.src = responseJson[i].person.image.medium;
        }
        if(responseJson[i].person.country === null){
          country.innerHTML = "Unknown country"; 
        } else {
          var countryContent = responseJson[i].person.country.name;
          country.innerHTML = countryContent;
        }
        li.append(image);
        li.appendChild(title);
        li.appendChild(country);
        li.addEventListener("click", changeFavorite);
        ul.appendChild(li);

        if(arrayFavouritesSaved !== null) {
          for(var j = 0; j < arrayFavouritesSaved.length; j++)
          if(arrayFavouritesSaved[j].id == i && arrayFavouritesSaved[j].name === responseJson[i].show.name){
            li.classList.add("container-favorite");
          }
      }
      }
    })
    }


function putArrayInLocalStorage(filmsArray) {
  localStorage.setItem("films-array", JSON.stringify(filmsArray));
}

function createArray(filmData){
  filmsArray[counter] = filmData;
  // for (var j = 0; j < filmsArray.length; j++){
  //   console.log(filmsArray[j]);
  // }
  putArrayInLocalStorage(filmsArray);
}

function createObject(filmName, filmId, counter) {
  var filmData = {};
  filmData.name = filmName;
  filmData.id = filmId;
  createArray(filmData, counter);
}

function changeFavorite(e) {
  var li = e.currentTarget;
  if(li.classList.contains("container-no-favorite")) {
    li.classList.toggle("container-favorite")
  } else {
    li.classList.delete("container-favorite")
  }
  var filmName = li.textContent;
  var filmId = li.id;
  createObject(filmName, filmId, counter);
  counter ++;
}

button.addEventListener('click', searchFilms);

