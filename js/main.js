// constants
var API_KEY = "ff9cc0925de945b64c1068198b1eeff0"
var USER_ID = "69711006@N07"
var PHOTOSET_ID = "72157663257812101"

/*******************************
Properties
*******************************/
var currentPhotoId;

var mask = document.getElementById("mask");
var lightbox = document.getElementById("lightbox");
var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");

var album = new Album();

// functions
function init() {
  getPhotos(USER_ID, PHOTOSET_ID, getPhotos_success);
  setupEventListeners();
}

function setupEventListeners() {
  document.getElementById("close").addEventListener('click', onClose);
  leftArrow.addEventListener('click', onClickPrev);
  rightArrow.addEventListener('click', onClickNext);
}

/*******************************
 Events
*******************************/

function onClickNext () {
  currentPhotoId = (currentPhotoId + 1)%album.photos.length;
  updateLightBoxPhoto();
}

function onClickPrev () {
  currentPhotoId = (currentPhotoId - 1 + album.photos.length)%album.photos.length ;
  updateLightBoxPhoto();
}

function onClose() {
  toggleVisibility(mask);
  toggleVisibility(lightbox);
  toggleVisibility(leftArrow);
  toggleVisibility(rightArrow);

  removeLightboxPhoto();
}

/*******************************
Light Box Helper Functions
*******************************/

function updateLightBoxPhoto() {
  removeLightboxPhoto();
  addLightboxPhoto();
}

function addLightboxPhoto() {
  var photo = document.createElement("img");
  photo.setAttribute("id", "lightbox-image");
  photo.src = album.photos[currentPhotoId].src;
  lightbox.appendChild(photo);
}

function removeLightboxPhoto() {
  var el = document.getElementById("lightbox-image");
  el.parentNode.removeChild(el);
}

function toggleVisibility(el) {
  if (el.style.display == "none" || el.style.display == "" ) {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

// init
init();