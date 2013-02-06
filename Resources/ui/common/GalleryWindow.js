function GalleryWindow(categoryId, categoryName, autoFire) {
	
	Titanium.include('thirdparty/titanium-picture-gallery/picturegallery.js');

	function UpdateImages(){
		var db = require('db');
		var galleryImages = [];
		var images = db.getImagesForCategory(categoryId);
		for(var i=0,j=images.length; i<j; i++){
		  galleryImages[i] = {path:images[i].image, id:images[i].id, category:images[i].category} 
		};
		return galleryImages;
	}
	
	var pictureGallery = PictureGallery.createWindow({
 		images: UpdateImages(),
 		title: categoryName,
 		categoryId: categoryId,
 		windowGroup:Ti.App.nav,
 		autoFireImage:autoFire
	});
	
	Ti.App.nav.open(pictureGallery);
	return pictureGallery;
}

module.exports = GalleryWindow;