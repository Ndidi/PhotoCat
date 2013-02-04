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
	
	//Add behavior for UI
	addPhoto.addEventListener('click', function(){
		var modalWindow = Ti.UI.createWindow({
			backgroundColor:'purple'
		});
		
		var choosebtn = Ti.UI.createButton({
			title:'Choose from gallery',
			width:100,
			height:30
		});
		
		var takePhotoBtn = Ti.UI.createButton({
			title:'Take a photo',
			width:100,
			height:30
		});
		
		var cancelBtn = Ti.UI.createButton({
			title:'Cancel',
			width:100,
			height:30
		});
		
	});
	// label.addEventListener('click', function(e) {
		// alert(e.source.text);
	// });
	
	return self;
}

module.exports = HomeWindow;
