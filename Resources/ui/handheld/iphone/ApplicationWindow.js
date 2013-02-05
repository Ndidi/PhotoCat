//Application Window Component Constructor
function ApplicationWindow() {
	var self = Titanium.UI.createWindow();
	
	var HomeWindow = require('ui/common/HomeWindow'); 
	
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
