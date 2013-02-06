function CategoryWindow(image, mode){
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Categories',
		navBarHidden:false
	});
	
	var db = require('db');
	var GalleryWindow = require('ui/common/GalleryWindow');
	var categories = db.getAllCategories();
	
	function SaveAndSwitchToViewMode(categoryId){
		db.saveImageToCategory(image, categoryId);
		self.setRightNavButton(null);
		mode = "VIEW";
	}
	
	//Right Nav Button
	if(mode == "SAVE"){
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
					var catId = db.getIdForCategoryName(e.text);
					SaveAndSwitchToViewMode(catId);
					tableView.appendRow(Ti.UI.createTableViewRow({title:e.text}));
					Ti.App.nav.open(new GalleryWindow(catId, e.text));
				}
			});
			dialog.show();
		});
		self.rightNavButton = addButton;	
	} else if(mode == "VIEW"){
		self.setRightNavButton(null);
	}
	
	//The Table
	var data = [];
	
	for(var i=0,j=categories.length; i<j; i++){
	  data[i] = Ti.UI.createTableViewRow({title:categories[i].name}) 
	};
	
	var tableView = Titanium.UI.createTableView({
		data:data
	});
	
	tableView.addEventListener('click', function(e){
		if(mode == "SAVE"){
			SaveAndSwitchToViewMode(e.index);
		}
		
		Ti.App.nav.open(new GalleryWindow(e.index, categories[e.index].name));
	
	});
	
	self.add(tableView);
	return self;
}

module.exports = CategoryWindow;