/**charge le DOM */
window.onload = function() {
    /**selectionne l'element dans le DOM ayant l'ID email*/
    let email = document.querySelector("#email");
    /**applique un ecouteur d'evenement sur l'element "email"*/
    email.addEventListener ("change", verifEmail);


    /**selectionne l'element mot de passe*/
    let password = document.querySelector("#password");
    password.addEventListener ("change", verifPassword);
}


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
function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


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