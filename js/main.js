'use strict';

var button = document.querySelector(".button-search");
var input = document.querySelector(".input-film");
var containerResults = document.querySelector(".container-results");


function searchFilms(){
    var inputContent = input.value;
    var url = "http://api.tvmaze.com/search/shows?q="
    fetch(url + inputContent)
    .then(function(response){
        return response.json();
    })
    .then(function(responseJson){
        containerResults.innerHTML = "";
        var ul = document.createElement("ul");
        containerResults.appendChild(ul);
        for (var i = 0; i< responseJson.length; i++){
            var li = document.createElement("li");
            var title = document.createElement("h2");
            var titleContent = document.createTextNode(responseJson[i].show.name);
            title.appendChild(titleContent);
            li.appendChild(title);   
            var image = document.createElement("img");
                if(responseJson[i].show.image === null){
                    image.src = "https://via.placeholder.com/210x295/cccccc/666666/?text=TV";
                } else {
                    image.src = responseJson[i].show.image.medium;
                }
            li.append(image);
            ul.appendChild(li);
            
        }
    })
    // .then(function()
}



button.addEventListener("click", searchFilms);
