
window.onload = function() {
    let name = document.querySelector("#name");
    name.addEventListener ("change", verifName);

    let email = document.querySelector("#email");
    email.addEventListener ("change", verifEmail);

    let password = document.querySelector("#password");
    password.addEventListener ("change", verifPassword);
}

function verifName() {
    console.log(this.value);

    let error = document.getElementById("nameerror");
        if(this.value.length >=5) {
            this.styleborderColor = "green";
            error.style.display = "block";
        }
        else {
            this.style.borderColor = "red";
            error.style.display = "block";
        }

}

function verifEmail() {
    console.log(this.value);


}
function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validPassword(){
    const expresreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return expresreg.test(password)
}

function verifPassword() {
    let error = document.querySelector("#passworderror");

    if (this.value.length >=6) {
        this.style.borderColor = "green";
        error.style.display = "none";
    }
    else {
        this.style.borderColor = "red";
        error.style.display = "block";
    }
}

