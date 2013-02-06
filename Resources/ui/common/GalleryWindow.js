function GalleryWindow(categoryId, categoryName, autoFire) {
	var db = require('db');
	
	Titanium.include('thirdparty/titanium-picture-gallery/picturegallery.js');

	var galleryImages = [];
	var images = db.getImagesForCategory(categoryId);
	
	for(var i=0,j=images.length; i<j; i++){
	  galleryImages[i] = {path:images[i].image, id:images[i].id, category:images[i].category} 
	};
	
	var pictureGallery = PictureGallery.createWindow({
 		images: galleryImages,
 		title: categoryName,
 		windowGroup:Ti.App.nav,
 		autoFireImage:autoFire
	});
	
	Ti.App.nav.open(pictureGallery);
	return pictureGallery;
}

module.exports = GalleryWindow;