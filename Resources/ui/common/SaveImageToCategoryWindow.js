function SaveImageToCategoryWindow(image){
	var self = Ti.UI.createWindow({
		backgroundColor:'white'
	});
	
	var db = require('db');
	db.getAllCategories();
	
	return self;
}

module.exports = SaveImageToCategoryWindow;