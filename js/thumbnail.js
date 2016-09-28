/*******************************
 Thumbnail
 *******************************/

function Thumbnail(photo, id) {
  this.id = id;
  this.photo = photo;
  this.el = "";
}

Thumbnail.prototype.renderThumbnailDetailElement = function (photo) {
  var details = document.createElement("DIV");
  details.className = "thumbnail-detail";

  var title;
  if(photo.info.title == "."){
    title = "";
  } else {
    title = photo.info.title;
  }

  var detailsHeader = document.createTextNode(title);

  details.appendChild(detailsHeader);
  return details;
}

Thumbnail.prototype.onClick = function(e) {
  currentPhotoId= this.id
  addLightboxPhoto();

  toggleVisibility(mask);
  toggleVisibility(lightbox);
  toggleVisibility(leftArrow);
  toggleVisibility(rightArrow);
};

Thumbnail.prototype.renderThumbnailElement = function() {
  var thumbnail = document.createElement("DIV");
  var thumbnailContent = document.createElement("DIV");
  thumbnail.className = "thumbnail";
  thumbnailContent.className = "thumbnailContent";

  var img = this.photo.renderImgElement();
  var detail = this.renderThumbnailDetailElement(this.photo);

  thumbnail.id = this.id;
  thumbnail.addEventListener('click', this.onClick)

  thumbnailContent.appendChild(img);
  thumbnailContent.appendChild(detail);

  thumbnail.appendChild(thumbnailContent);

  this.el = thumbnail;

  return thumbnail;
}
