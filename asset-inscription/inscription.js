/*Feuille javascript pour la page 4 inscription (Sign up) d'ACS-Music*/
window.onload= function(){
        //récupère et ecoute l'id  "#email"
        let email = document.querySelector("#email");
        email.addEventListener('change', verifMail); 
    
        //récupère et ecoute l'id "#password"
        let pass= document.querySelector('#password');
        pass.addEventListener('change', verifPassword);
    
    }
//vérification de l'adresse Email, expression regulière
function validerEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
    

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

// vérification du mot du mot de passe
function validerPassword(pass){
    const expresreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return expresreg.test(pass);
}
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