'use strict';

var button = document.querySelector('.button-search');
var input = document.querySelector('.input-film');
var containerResults = document.querySelector('.container-results');

function searchFilms() {
  var inputContent = input.value;
  var url = 'http://api.tvmaze.com/search/people?q=';
  fetch(url + inputContent)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseJson) {
      console.log(responseJson);
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
