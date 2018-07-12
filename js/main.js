'use strict';

var button = document.querySelector('.button-search');
var input = document.querySelector('.input-film');
var containerResults = document.querySelector('.container-results');

function searchFilms() {
  var inputContent = input.value;
  var url = 'http://api.tvmaze.com/search/shows?q=';
  fetch(url + inputContent)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJson) {
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
        title.classList.add('film-title');
        title.appendChild(titleContent);
        image.classList.add('image-film');
        if(responseJson[i].show.image === null) {
          image.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          image.src = responseJson[i].show.image.medium;
        }
        li.append(image);
        li.appendChild(title);
        li.addEventListener("click", changeFavorite);
        ul.appendChild(li);
      }
    });
}

function changeFavorite(e) {
  var li = e.currentTarget;
  if(li.classList.contains("container-no-favorite")) {
    li.classList.toggle("container-favorite")
  } else {
    li.classList.delete("container-favorite")
  }
}

button.addEventListener('click', searchFilms);
