/*feuille de Javascript pour la page de connexion*/
window.onload = function(){
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
    }

    else{
        this.style.borderColor='red';
        errormail.style.display="block";
    }

}
// vérification du mot du mot de passe
function verifPassword(){
    let testmp = 1; //cette valeur sera à remplacer par le retour de mot de passe 
    let errormp = document.querySelector('.errormp');
    if(this.value.length===testmp){ 
        this.style.borderColor='green';
        errormp.style.display='none';
    }
    else{
        this.style.borderColor="red";
        errormp.style.display="block";
    }
}
