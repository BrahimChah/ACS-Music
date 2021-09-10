/*feuille JS Player ACS-Music, p.6 */
//Appel de la fonction envoyer 
envoyer();


function envoyer(){
    let token = sessionStorage.getItem('token');

    queryString = window.location.search;
    let idurl = getAllUrlParams(queryString);
    //récupération de la chanson avec son id depuis l'API
       let url = "http://api-music.test/api/tracks/"+idurl.id

    fetch(url, {
        method : "GET", 
        headers :{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token    
        }
    })
    .then(response =>response.json())
    //remplacer le nom de l'album par celui de l'API selectionné précedemment
    .then (response => {
        let image = document.querySelector('.imghead');
        let title = document.querySelector('.title-player');
        title.innerHTML = response.name;
        // console.log(response.name);
        let subtitle = document.querySelector('.subtitle-player');
        
        //2ème fetch pour récupérer l'album
        url = "http://api-music.test"+response.album;
        fetch(url, {
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        .then(response =>response.json())
        //remplacer l'image de l'album dans le header du player
        .then(response => {
            image.src = response.picture;
            //remplacer le sous titre par le nom de l'album
            subtitle.innerText = response.name

        // //3ème fetch pour récupérer le nom de l'artiste ATTENTION FAUX on veut le nom de la chason
        //     url = "http://api-music.test"+ response.artist;
        //     fetch(url, {
        //         headers : {
        //             "Content-Type": "application/json",
        //             "Authorization": "Bearer " + token
        //         }
        //     })
        //     .then(response =>response.json())
        //     .then(response => {
        //         console.log(response)
        //         subtitle.innerText = response.username})

            });
    })
    .catch(error => alert("Erreur:" + error));
}

//Fonction récupéré qui permet de changer l'URL en objet JSON:
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
  
/*Options supplémentaire*/ 
//mise en marche du player

  window.onload = function() {
    wave = document.querySelector(".soundwave");
    barre = document.querySelector(".playerbar");
    player = document.querySelector(".btn-player").addEventListener("click", play);
    imgplayer = document.querySelector(".img-player")
    fastforward = document.querySelector(".btn-f-forward").addEventListener("click", fastforw);
    fastforward2 = document.querySelector(".btn-f-forward").addEventListener("mousedown", fastforw2);
    fastforward3 = document.querySelector(".btn-f-forward").addEventListener("mouseup", fastforw3);
    forward = document.querySelector(".btn-forward").addEventListener("click", forw);
    returnbtn = document.querySelector(".btn-return").addEventListener("click", ret);
    fastreturn = document.querySelector(".btn-f-return").addEventListener("click", fastret);
    fastreturn2 = document.querySelector(".btn-f-return").addEventListener("mousedown", fastret2);
    fastreturn3 = document.querySelector(".btn-f-return").addEventListener("mouseup", fastret3);    
  }

let audio = new Audio('./assets/musiques/audio1.mp3');
//tableau de piste audio pour le bouton aléatoire
let playlist = ["./assets/musiques/audio1.mp3", "./assets/musiques/audio2.mp3", "./assets/musiques/audio3.mp3", "./assets/musiques/audio4.mp3","./assets/musiques/audio5.mp3", "./assets/musiques/audio6.mp3"]
let interupteur = true;

  //fonction play
    function play(){
      //changement du bouton play en pause
      if (interupteur === true) {
          wave.src="./assets/imgs/Audio.gif";
          wave.style.width = "20vh"
          audio.play();
          imgplayer.src = "./assets/imgs/pause.png";
          interupteur = false;
        } 
        else {
          wave.src="./assets/imgs/soundwave.png";
          audio.pause();
          imgplayer.src = "./assets/imgs/player.png";
          interupteur = true;
        }
    }
    
  // fonction avancer rapidement 
    function fastforw(){
        console.log("fast f");
        audio.currentTime += 5;
    }

  //si on reste appuyer sur la souri: 
  let appuis;
  function fastforw2(){
    appuis = setInterval(fastforw, 200);
    appuis;
    console.log("fast f");
    audio.currentTime += 5;
  }
  //Fonction permettant de retirer l'avance rapide
  function fastforw3(){
    clearInterval(appuis);
  } 

  //fonction bouton de lecture aléatoire
    function forw(){
      console.log("f");
      audio.pause();
      //lecture aléatoire de notre tableau de music
      aleatoire = Math.floor(Math.random()*6);
      audio = new Audio(playlist[aleatoire]);
      console.log(aleatoire);
      audio.play();

      
    }
  //fonction revenir au début de la musique
    function ret(){
      audio.currentTime = 0;
    }
  // fonction retour rapidement
    function fastret(){
      audio.currentTime -= 5;
      console.log("fast r");
    }
  //si on reste appuyer sur la souri: 
  let appuis2;
  function fastret2(){
    appuis2 = setInterval(fastret, 200);
    appuis2;
    console.log("fast r");
    audio.currentTime -= 5;
  }
  //Fonction permettant de retirer l'avance rapide
  function fastret3(){
    clearInterval(appuis2);
  } 

