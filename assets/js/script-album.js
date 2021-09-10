/* Feuille JS Albums ACS-Music (p.5)*/

// let texte = "plus de vingts caractères";
// let li;
// window.onload = function(){
//     li = document.getElementsByTagName("li");
//     for (let index=0; index<li.length; index++) {
//         if (li[index].length > 20) {
//             li[index].textContent = textContent.substr(0, 20)+"...";
//         }
//     }
// }
//section 1
let token = sessionStorage.getItem('token')
// console.log(token);


function album(){
    queryString = window.location.search;
    let idurl = getAllUrlParams(queryString);
    // console.log(idurl)
    //récupérer tous les albums de l'API, en fonction de leur ID précédemment selection (sur la page Song)
    let url = "http://api-music.test/api/albums/"+ idurl.id;
    fetch(url, {
        method : "GET", 
        headers :{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }        
    })
    .then(response =>response.json()) 
    //remplacer le titre et les images par ceux précedemment sélectionné dans l'API
      .then (response => {
        //remplacer le titre de l'album
          let title = document.querySelector('.title-album');
          title.innerText = response.name;
        // remplacer l'image de l'album
          let image = document.querySelector('.pochette-album');
          image.src = response.picture;

      //2ème fetch pour récuperer le nom de l'artiste
        let subtitle = document.querySelector('.subtitle');
        url = "http://api-music.test"+response.artist;
        fetch(url, {
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        .then(response =>response.json())
          //remplacer le sous titre par le nom de l'artiste 
          .then(response => {subtitle.innerText = response.username});

//section 2, la listes des titres présent dans l'album (tracks)

          //D'abord on créer une liste avec des liens 
          for (let i=0; i<response.tracks.length; i++){
              let li = document.createElement("li");
              let a = document.createElement("a");
              let ul = document.querySelector(".ul-album");
              //on précise qui est l'enfant de qui
              ul.appendChild(li);
              li.appendChild(a);

              // on doit couper "response.tracks[i] car il nous donne "/api/tracks/##" donc on coupe avec un slice au 12ème caractère
              let suitelien = response.tracks[i].slice(12);
              // console.log(suitelien); //on vérifie que ça marche
              
              // on ajoute le lien coupé à la page player.html
              a.href = "player.html?id="+suitelien; 

          
            //récupérer le nom des tracs via l'API
            url = "http://api-music.test"+response.tracks[i];
            fetch(url, {
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                }
            })
            .then(response =>response.json()
            //remplacer les liens par le nom des chansons de l'album
            .then(response => {a.innerText = response.name}))
        }
        
        console.log(response);
    })
    .catch(error => alert("Erreur:" + error));
   
}

 album();

 //fonction qu'on a récupérer pour transformer l'URL en objet JSON:
 function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }
  

