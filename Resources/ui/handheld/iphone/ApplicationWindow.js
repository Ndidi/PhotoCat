//Application Window Component Constructor
function ApplicationWindow() {
	var self = Titanium.UI.createWindow();
	
	var HomeWindow = require('ui/common/HomeWindow'),
		CategoryListWindow = require('ui/common/CategoryListWindow'),
		GalleryWindow = require('ui/common/GalleryWindow'),
		ImageDetailWindow = require('ui/common/ImageDetailWindow'); 
	
	var homeWindow = new HomeWindow();
	
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window: homeWindow
	});

	self.add(nav);
	
	Ti.App.nav = nav;
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
