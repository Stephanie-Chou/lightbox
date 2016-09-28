/*******************************
 Photo
 *******************************/

function Photo(info) {
  this.info = info;
  this.src = "";
}

Photo.prototype.renderImgElement = function () {
  var img = document.createElement("IMG");
  this.src = composeImgSrc(this.info);
  img.src = this.src;
  return img;
}

/*******************************
 Helper Functions
*******************************/

function composeImgSrc(photo) {
  var src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg'
  return src;
}