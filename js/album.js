/*******************************
 Album
 *******************************/
function Album() {
  this.photos = [];
  this.el = "";
}

Album.prototype.getPhotos = function(user_id, photoset_id, callback) {
  var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="
  + API_KEY
  + "&format=json&nojsoncallback=1&user_id="
  + user_id
  + "&photoset_id="
  + photoset_id;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

Album.prototype.loadPhotos = function(photos) {
  var container = document.createElement("DIV");

  album.el = document.getElementById("album");
  var photo;
  var thumbnail;

  for (var i = 0; i < photos.length; i++) {
    var item=photos[i];
    photo = new Photo(item);

    this.photos.push(photo);

    // build thumbnails

    thumbnail = new Thumbnail(photo, i)
    thumbnail.renderThumbnailElement();

    container.appendChild(thumbnail.el)
  }
    album.el.appendChild(container);
}

function getPhotos_success(response) {
    var res = JSON.parse(response);

    if (res.code === 100) {
      alert(res.message);
      return;
    } else {
      album.loadPhotos(res.photos.photo);
    }
}
