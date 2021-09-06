let texte = "plus de vingts caractères";
let li;
window.onload = function(){
    li = document.getElementsByTagName("li");
    for (let index=0; index<li.length; index++) {
        if (li[index].length > 20) {
            li[index].textContent = textContent.substr(0, 20)+"...";
        }
    }
}




