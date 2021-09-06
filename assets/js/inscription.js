/**
Vérification des données d'un formulaire
*/

// On attends que le DOM soit chargé
window.onload = function() {
    let name = document.getElementById('name'); // Sélectionne un élément dans le DOM avant l'ID "name"
    let mail = document.getElementById('mail');
    let pwd = document.querySelector('#pwd');
    let sub = document.getElementById("submit")

    name.addEventListener('change', verifName);
    mail.addEventListener('change', verifMail);
    pwd.addEventListener('change', verifPwd);
    sub.addEventListener("click", envoyer);
}


function verifName() 
{
    let error = document.getElementById('nameerror');
    let success = document.getElementById('namesuccess')
    // alert('Changement !');
    /** "this" correspond à l'élément ayant enclenché cette fonction, soit
     * dans notre cas de figure "name"
     */
    // console.log(this.value);

    //On vérifie que le nombre de caractères soit égal ou supérieur à 5
    //.value -> Récupère la valeur contenu de le champs text
    //.length -> Retourne le nombre dee caractères de la chaîne de caractères
    if (this.value.length >= 5) {
        //Change la bordure du champ en vert
        // this.style.border = "1px solid green"
        this.style.borderColor = "green";
        error.style.display = 'none';
        success.style.display = 'block';
    }
    else{
        this.style.borderColor = "red";
        error.style.display = 'block';
        success.style.display = 'none';
    }
}

// Vérification de l'adresse email
function verifMail() 
{
    // Créer un élément HTML "<p></p> sur JAVASCRIPT"
    // let error = document.createElement('p');
    // error.classList.add('error');
    // error.style.display = "block";
    // error.innerText = "Votre adresse email est invalide";
    let error = document.getElementById('mailerror'); //Lié au HTML
    let success = document.getElementById('mailsuccess')

    // Si l'adresse email est correct, on met les bordures en vert
    if(checkMail(this.value)) {
        this.style.borderColor = 'green';
        error.style.display = 'none'; //Lié au HTML
        success.style.display = 'block';
    }
    else {
        this.style.borderColor = 'red'; 
        error.style.display = 'block'; //Lié au HTML
        success.style.display = 'none';

        // Ajoute le nouvel élément HML juste après notre champ email sur JAVASCRIPT
        // this.after(error);
    }
}

// Expression régulière permettant la vérification syntaxique d'une adresse email
function checkMail(mail)
{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

// Vérification du mot de passe
function verifPwd()
{
    let error = document.querySelector('#pwdError');
    let success = document.querySelector('#pwdSuccess')

    if (this.value.length >=6) {
        this.style.borderColor = 'green';
        error.style.display = 'none';
        success.style.display = 'block';
    }
    else {
        this.style.borderColor = 'red';
        error.style.display = 'block';
        success.style.display = 'none';
    }
}




function envoyer() {
    url = window.location+"email="+mail.value+"&password="+pwd.value;
    getAllUrlParams(url);
    console.log(url);
    localStorage.setItem('email', mail.value); 
    localStorage.setItem('username', "username");    
    localStorage.setItem('password', pwd.value);
    url = "http://musics.logikstik.odns.fr/api/users/";
    fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify(
                {
              name: localStorage.getItem('username'),
              email: localStorage.getItem('email'),
              password : localStorage.getItem('password')
            }
            )
      })
      
}

let url, obj;
function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=');
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
        if (paramName.match(/\[(\d+)?\]$/)) {
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
          if (paramName.match(/\[\d+\]$/)) {
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            obj[key].push(paramValue);
          }
        } else {
          if (!obj[paramName]) {
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            obj[paramName].push(paramValue);
          }
        }
      }
    }
    return obj;
  }
  