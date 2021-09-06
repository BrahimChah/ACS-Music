/**
Vérification des données d'un formulaire
*/

// On attends que le DOM soit chargé
window.onload = function() {
    let name = document.getElementById('name'); // Sélectionne un élément dans le DOM avant l'ID "name"
    let mail = document.getElementById('mail');
    let pwd = document.querySelector('#pwd');

    name.addEventListener('change', verifName);
    mail.addEventListener('change', verifMail);
    pwd.addEventListener('change', verifPwd);
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