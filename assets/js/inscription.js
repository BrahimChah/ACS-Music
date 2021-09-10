/*Feuille javascript pour la page 4 inscription (Sign up) d'ACS-Music*/
let user;
let email;
let pass;

window.onload= function(){
        user = document.querySelector("#name");  //récupère l'id "#name"

        //récupère et ecoute l'id  "#email"
        email = document.querySelector("#email");
        email.addEventListener('change', verifMail); 
    
        //récupère et ecoute l'id "#password"
        pass= document.querySelector('#password');
        pass.addEventListener('change', verifPassword);

        let btn = document.querySelector('.btn');
        btn.addEventListener('click', envoyer);       
         
        
            
    }
// expression regulière pour le mail
function validerEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
    
//vérification pour l'adresse mail
function verifMail() {
    let errormail = document.querySelector('.errormail');
    if (validerEmail(email.value)){
            email.style.borderColor = 'green';
            errormail.style.display="none";  
    }
    
    else{
            this.style.borderColor='red';
            errormail.style.display="block";
    }
}

//expression régulière pour le password
function validerPassword(pass){
    const expresreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return expresreg.test(pass);
}
// vérification du mot de passe
function verifPassword(){ 
    let pass = document.querySelector('#password');
    let consigne = document.querySelector('.consigne');
    
    if(validerPassword(pass.value)){ 
        this.style.borderColor='green';
        consigne.style.display='none';
    }
    else{
        this.style.borderColor="red";
        consigne.style.display="block";
    }
}

//fonction qui permet d'envoyer le formulaire d'inscription sur l'API 
function envoyer(){    
    let url = "http://api-music.test/api/users"; //si FETCH on envoit une URL, ici on récupère l'URL 
    fetch (url, {
        method:"POST", //comme sur l'API, on utilise la méthode "post" et pas 'get'
        headers:{
            "Content-Type": "application/json" 
        }, 
        body: JSON.stringify ({ 
            "name": user.value,
            "email": email.value,
            "password": pass.value
          })
    })
    .then(response => response.json())
    .then(response => alert(JSON.stringify(response)))
    .catch(error => alert("Erreur : " + error));
    }
