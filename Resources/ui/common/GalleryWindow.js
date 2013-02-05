function GalleryWindow(categoryId) {
	var self = Ti.UI.createWindow({
		backgroundColor:'blue'
	});
	
	var db = require('db');
	
	Titanium.include('thirdparty/titanium-picture-gallery/picturegallery.js');

	var galleryImages = [];
	var images = db.getImagesForCategory(categoryId);
	
	for(var i=0,j=images.length; i<j; i++){
	  galleryImages[i] = {path:images[i].image} 
	};
	
	var pictureGallery = PictureGallery.createWindow({
 		images: galleryImages
	});
	
	pictureGallery.open();
	
	return self;
}

module.exports = GalleryWindow;