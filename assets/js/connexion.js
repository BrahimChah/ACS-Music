/**
Vérification des données d'un formulaire
*/

// On attends que le DOM soit chargé
window.onload = function() {
    let mail = document.getElementById('mail');
    let pwd = document.querySelector('#pwd');
    let sub = document.getElementById("submit")

    mail.addEventListener('change', verifMail);
    pwd.addEventListener('change', verifPwd);
    sub.addEventListener("click", envoyer);
}

// Vérification de l'adresse email
function verifMail() 
{
    let error = document.getElementById('mailerror'); //Lié au HTML
    let success = document.getElementById('mailsuccess')
    if(checkMail(this.value)) {
        this.style.borderColor = 'green';
        error.style.display = 'none'; //Lié au HTML
        success.style.display = 'block';
    }
    else {
        this.style.borderColor = 'red'; 
        error.style.display = 'block'; //Lié au HTML
        success.style.display = 'none';
    }
}

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

    url = "http://musics.logikstik.odns.fr/api/login/";
    fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify(
                {
              name: localStorage.getItem('username'),
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
  