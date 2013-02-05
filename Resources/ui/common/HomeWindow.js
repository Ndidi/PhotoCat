function HomeWindow() {
	var self = Ti.UI.createWindow({
		backgroundColor:'white'
	});
	
	//Create buttons
	var addPhoto = Titanium.UI.createButton({
		title:'Add Photo',
		height:40,
		width:200,
		top:40
	});

	var viewCategories = Titanium.UI.createButton({
		title:'View Categories',
		height:40,
		width:200,
		top:90
	});
	
	//Add to view
	self.add(addPhoto);
	self.add(viewCategories);
	
	//Dialog
	var dialog = Ti.UI.createOptionDialog({
	  cancel: 2,
	  options: ['Choose from gallery', 'Take a photo', 'Cancel'],
	  destructive: 2
	});
	
	dialog.addEventListener('click', function(e){
			//imageOptionsType is doubles up for PhotoGalleryOptionsType and CameraOptionsType
		var imageOptionsType = {
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
			success:function(cameraMediaItemType){
				var SaveImageToCategoryWindow = require('ui/common/SaveImageToCategoryWindow');
				Ti.App.nav.open(new SaveImageToCategoryWindow(cameraMediaItemType));
			},
			cancel:function(){},
			error:function(error){
				var alert = Titanium.UI.createAlertDialog({title:'Camera'});
				if (error.code == Titanium.Media.NO_CAMERA){
					alert.setMessage('Please run this test on a device');
				}
				else{
					alert.setMessage('Unexpected error: ' + error.code);
				}
				alert.show();
			}
		};
		
		if(e.index === 0){
			//Gallery
			Ti.Media.openPhotoGallery(imageOptionsType);
		}
		else if(e.index === 1){
			//Camera
			Titanium.Media.showCamera(imageOptionsType);
		}
	});
	
	addPhoto.addEventListener('click', function(e){
	  dialog.show();
	});
	
	viewCategories.addEventListener('click', function(e){
		var CategoryListWindow = require('ui/common/CategoryListWindow');
		Ti.App.nav.open(new CategoryListWindow());
	});
	
	return self;
}

module.exports = HomeWindow;
