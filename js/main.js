// api
var api_key = "ff9cc0925de945b64c1068198b1eeff0";
var user_id = "69711006@N07"
// Properties
var photos;


// functions
function getPhotos(user_id, photoset_id, callback)
{
    var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + api_key + "&format=json&nojsoncallback=1&user_id=" + user_id + "&photoset_id=" + photoset_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function getPhotos_success(response) {
  photos = JSON.parse(response).photoset.photo
  loadPhotos();
}

function loadPhotos() {
  var col1 = document.getElementById("col1");
  var col2 = document.getElementById("col2");
  var col3 = document.getElementById("col3");

  var thumbnail;

  for (var i = 0; i<photos.length; i++) {
    var item=photos[i];
    thumbnail = createThumbnailElement(item, i);


    switch(i%3) {
      case 0:
        col1.appendChild(thumbnail);
        break;
      case 1:
        col2.appendChild(thumbnail);
        break;
      case 2:
        col3.appendChild(thumbnail);
        break;
    }
  }
}

// Events
function onClickThumbnail(e) {
  var mask = document.getElementById("mask");
  var lightbox = document.getElementById("lightbox");

  var photo = document.createElement("img");
  photo.setAttribute("id", "lightbox-image");
  photo.src =  getImgSrc(photos[this.id])

  mask.style.display="block";
  lightbox.style.display="block";

  lightbox.appendChild(photo);
}

function onClickNext () {
    console.log("click>")
}

function onClickPrev () {
  console.log("<click")
}

function onClose() {
  mask.style.display="none";
  lightbox.style.display="none";

  var el = document.getElementById("lightbox-image");
  el.parentNode.removeChild(el);
}

// helper functions
document.getElementById("close").addEventListener('click', onClose);


function createThumbnailElement(item, id) {
  var thumbnail = document.createElement("DIV");
  thumbnail.className="thumbnail";
  var img = createImgElement(item);
  var detail = createThumbnailDetailElement(item);

  thumbnail.id = id;
  thumbnail.addEventListener('click', onClickThumbnail)

  thumbnail.appendChild(img);
  thumbnail.appendChild(detail);

  return thumbnail;
}

function createThumbnailDetailElement(item) {
  var details = document.createElement("DIV");
  details.className = "thumbnail-detail";

  if(item.title == "."){
    item.title = "";
  }
  var detailsHeader = document.createTextNode(item.title);

  details.appendChild(detailsHeader);
  return details;
}

function getImgSrc(item) {
    var src = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'
    return src
}

function createImgElement(item) {
  var img = document.createElement("IMG");

  img.src = getImgSrc(item);
  return img;
}



// call everything
getPhotos(user_id, "72157663257812101", getPhotos_success);