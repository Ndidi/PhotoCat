function SaveImageToCategoryWindow(image){
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Categories'
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
	
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	self.add(tableview);
	return self;
}

module.exports = SaveImageToCategoryWindow;