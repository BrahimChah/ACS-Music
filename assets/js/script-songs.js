    /*feuille Js Songs (p.4) ACS-Music 

    /*section du haut*/
    //récupération des 20 albums récemment écoutés (classement acsendent)
    let token = sessionStorage.getItem('token');
    let url = "http://api-music.test/api/albums?page=1&order%5Bcreated_at%5D=asc" 
    fetch(url, {
        method : "GET", 
        headers :{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,            
        }        
    })
    .then(response =>response.json())

    //récupération des images des albums de l'API
    .then (response => {
        let slidetop = document.querySelectorAll(".img-slide");
        let lien = document.querySelectorAll('.lien-slide');

        for(let i=0; i<slidetop.length; i++){
          slidetop[i].src = response[i].picture;
          //liens vers son propre albums de l'API (avec l'ID)
          lien[i].href = "album.html?id=" + response[i].id;          
        }

    })
    .catch(error => alert("Erreur:" + error));

    /*section du bas*/
    //récupération des 8 albums récemment écoutés (classement descendent)
    url = "http://api-music.test/api/albums?page=1&order%5Brecently_played%5D=desc" 
    fetch(url, {
        method : "GET", 
        headers :{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,            
        }        
    })
    .then(response =>response.json())
    //récupération des images des albums de l'API
    .then (response => {
        let slidebottom= document.querySelectorAll(".img-table");
        let lien = document.querySelectorAll('.lien-table');

        for(let i=0; i<slidebottom.length; i++){
          slidebottom[i].src = response[i].picture;
          //liens vers son propre albums de l'API (avec l'ID)
          lien[i].href = "album.html?id=" + response[i].id;  
        }
    })
    .catch(error => alert("Erreur:" + error));

