id="125";
url = "http://musics.logikstik.odns.fr/api/albums/"+id;
console.log(url);

fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(json) {
        console.log(response)
      });
    } else {
      console.log("Attendu format JSON");
    }
  });
    
