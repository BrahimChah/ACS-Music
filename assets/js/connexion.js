//feuille de JS, connexion ACS-Music (p.2 Sign in)
let email;
let password;

/**charge le DOM */
window.onload = function() {
    /**selectionne l'element dans le DOM ayant l'ID email*/
    email = document.querySelector("#email");
    /**applique un ecouteur d'evenement sur l'element "email"*/
    email.addEventListener ("change", verifEmail);


    /**selectionne l'element mot de passe*/
    password = document.querySelector("#password");
    password.addEventListener ("change", verifPassword);

    let btn = document.querySelector(".btn");
    btn.addEventListener ('click', envoyer);
}

//fonction de vérification de l'adresse mail 
function verifEmail() {
    console.log(this.value);

    let error = document.querySelector("#passworderror");

    /**si l'email est correct les bordures seront vertes */
    /**"this" rappel l'element "email" */
    if (checkEmail(this.value)) {
        this.style.borderColor ="green";
        error.style.display = "none";
    }
    else {
        this.style.borderColor ="red";
        error.style.display = "block";
    }
}
//expression régulière du mail
function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//fonction pour vérifier la validité du passeword
function verifPassword(){
    console.log(this.value);

    let error = document.querySelector("#passworderror");

    if (this.value.length >=6){
        this.style.borderColor = "green";
        error.style.display = "none";
    }

    else {
        this.style.borderColor = "red";
        error.style.display = "block";
    } 
}

//fonction permettant de récupérer les données d'inscription et le token depuis l'API
function envoyer(){
    let url = "http://api-music.test/api/login"
    fetch(url, {
        method : "POST", 
        headers :{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "username": email.value,
                "password": password.value
            }
        )
    })
    .then(response =>response.json())
    .then (response => {
        // console.log(response, response.token)
        sessionStorage.setItem('token', response.token)
        location.href='songs.html'
    })
    .catch(error => alert("Erreur:" + error));
        
}


