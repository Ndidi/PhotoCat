function SaveImageToCategoryWindow(image){
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Categories',
		navBarHidden:false
	});
	var db = require('db');
	
	//Right Nav Button
	var addButton = Titanium.UI.createButton({title:'Add'});
	addButton.addEventListener('click', function(e){
		var dialog = Ti.UI.createAlertDialog({
			title:'Choose category name',
			style:Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames:['Cancel', 'OK'],
			cancel:0
		});
		dialog.addEventListener('click', function(e){
			if(e.index === 1){
				db.addCategory(e.text);
				//TODO need to add image to database
				//TODO go to detail view
			}
		});
		dialog.show();
	});
	self.rightNavButton = addButton;
	
	//The Table
	var categories = db.getAllCategories();
	var data = [];
	
	for(var i=0,j=categories.length; i<j; i++){
	  data[i] = Ti.UI.createTableViewRow({title:categories[i].name}) 
	};
	
	var tableView = Titanium.UI.createTableView({
		data:data
	});
	
	tableView.addEventListener('click', function(e){
		//index is the index of the clicked row. as we are not allowing table rows to be moved, this is fine.
		db.saveImageToCategory(image, e.index);
		
		//TODO Need to be detailWindow 
		// var GalleryWindow = require('ui/common/GalleryWindow');
		// Ti.App.nav.open(new GalleryWindow(e.index));
	});
	
	self.add(tableView);
	return self;
}

module.exports = SaveImageToCategoryWindow;