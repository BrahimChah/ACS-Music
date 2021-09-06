let requete = new XMLHttpRequest();


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

function envoyer() {
  requete.onreadystatechange = function() {
    if (requete.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
       if (requete.status == 200) {
           console.log(requete.responseText);
       }
       else if (requete.status == 400) {
          alert('Erreur 400');
       }
       else {
           alert('autre chose que 200 a été retourné');
       }
    }
  };
  url = window.location.search;
  console.log(getAllUrlParams(url));
  requete.open("GET", getAllUrlParams(url), true);
  requete.send();
}


