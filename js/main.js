'use strict';

var button = document.querySelector('.button-search');
var input = document.querySelector('.input-film');
var containerResults = document.querySelector('.container-results');
var counter = 0;
var filmsArray = [];

// Llamada a la API para que devuelva los datos de los shows que contienen la palabra indicada en el value.
//Le pedimos en el primer then que devuelva la respuesta en json
//En el segundo then le decimos que recupere las pelis que guardamos como favoritas en el localStorage

function searchFilms() {
  var inputContent = input.value;
  var url = 'http://api.tvmaze.com/search/shows?q=';
  fetch(url + inputContent)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJson) {
      console.log(responseJson);
      var arrayFavouritesSaved = JSON.parse(localStorage.getItem("films-array"));

//Pintamos la lista de las pelis que ha devuelto la llamada a la API (recorremos el array)

      var ul = document.createElement('ul');
      ul.classList.add("list");
      containerResults.innerHTML = '';
      containerResults.appendChild(ul);
      for (var i = 0; i < responseJson.length; i++) {
        var li = document.createElement('li');
        var title = document.createElement('h2');
        var titleContent = document.createTextNode(responseJson[i].show.name);
        var image = document.createElement('img');

        li.classList.add('container-no-favorite');

//Le damos un atributo a cada li que creamos

        li.setAttribute("id", i);
        title.classList.add('film-title');
        title.appendChild(titleContent);
        
//Ponemos una imagen por defecto para cuando no nos venga dada de la API

        image.classList.add('image-film');
        if(responseJson[i].show.image === null) {
          image.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          image.src = responseJson[i].show.image.medium;
        }
        
        li.append(image);
        li.appendChild(title);
//Ponemos un escuchador de evento a los lis, para que cuando pinchemos cambien de color

        li.addEventListener("click", changeFavorite);
        ul.appendChild(li);

//Si existen pelis favoritas en el localStorage
        if(arrayFavouritesSaved !== null) {
          for(var j = 0; j < arrayFavouritesSaved.length; j++)
          if(arrayFavouritesSaved[j].id == i && arrayFavouritesSaved[j].name === responseJson[i].show.name){
            li.classList.add("container-favorite");
          }
      }
      }
    })
    }

//Guardamos el array en el localStorage para recuperarlo más tarde, cuando se haga la misma búsqueda.

function putArrayInLocalStorage(filmsArray) {
  localStorage.setItem("films-array", JSON.stringify(filmsArray));
}

//Cada vez que le llega una peli favorita al array (filmData, que es un objeto con sus datos), se añade esa peli al array en el índice que indica el contador.
//Llamamos a la función que mete el array en el localStorage.

function createArray(filmData){
  filmsArray[counter] = filmData;
  // for (var j = 0; j < filmsArray.length; j++){
  //   console.log(filmsArray[j]);
  // }
  putArrayInLocalStorage(filmsArray);
}

//Creamos un objeto vacío llamado film data e introducimos el nombre de la peli y el id. Pasamos ese objeto a la función createArray para crear un array en el que meter todas las pelis favoritas.

function createObject(filmName, filmId, counter) {
  var filmData = {};
  filmData.name = filmName;
  filmData.id = filmId;
  createArray(filmData, counter);
  console.log(filmData);
}


// con esta función 1. le decimos que cambie el color de los elementos pinchados (guardados como favoritos). 
//En proceso: que borre los elementos guardados en el array de favoritos cuando se quite la selección de un elemento de la lista.

function changeFavorite(e) {
  var li = e.currentTarget;
  console.log(li);
  if(li.classList.contains("container-favorite")) {
    li.classList.remove("container-favorite")
    // var i = e.currentTarget.getAttribute('id');
    // console.log(i);
    // var filmName = li.textContent;
    // console.log(filmName);
    // var arrayFavouritesSaved = JSON.parse(localStorage.getItem("films-array"));
    // console.log(arrayFavouritesSaved);
    // if(arrayFavouritesSaved !== null) {
    //   for(var j = 0; j < arrayFavouritesSaved.length; j++)
    //   if(arrayFavouritesSaved[j].id == i && arrayFavouritesSaved[j].name === filmName){
    //     delete arrayFavouritesSaved[j];
    //     console.log(arrayFavouritesSaved);
    //     localStorage.setItem("films-array", JSON.stringify(arrayFavouritesSaved));
    //   }
    // }
  } else {
    li.classList.add("container-favorite")
  

  //2. guardamos en variables el título de la serie y el id que le hemos ido dando de las pelis que hemos marcado como favoritas

  var filmName = li.textContent;
  console.log(filmName);
  var filmId = li.id;
   
  //3. invocamos una función para crear un objeto con las pelis favoritas. Además, cada vez que sumamos una peli favorita, aumentamos en uno el contador, que será el número de objetos que contenga el array que guardaremos en el LocalStorage.

  createObject(filmName, filmId, counter);
  counter ++;
}
}

button.addEventListener('click', searchFilms);

