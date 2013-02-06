function CategoryWindow(image, mode){
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Categories',
		navBarHidden:false
	});
	
	var db = require('db');
	var GalleryWindow = require('ui/common/GalleryWindow');
	var categories;
	var rowData = [];
	var tableView = Titanium.UI.createTableView();
	
	function ConfigureTableViewEventListeners(){
		tableView.addEventListener('click', function(e){
			if(mode == "SAVE"){
				SaveAndSwitchToViewMode(e.index);
				Ti.App.nav.open(new GalleryWindow(e.index, categories[e.index].name, true));
			}else if(mode == "VIEW"){
				Ti.App.nav.open(new GalleryWindow(e.index, categories[e.index].name, false));
			}	
		});
		
		tableView.addEventListener('delete', function(e){
			var row = e.rowData;
			db.deleteCategory(row.id);
		});
	}
		
	function UpdateCategoriesAndRowData(){
		categories = db.getAllCategories();
	
		for(var i=0,j=categories.length; i<j; i++){
		  rowData[i] = Ti.UI.createTableViewRow({title:categories[i].name, id:categories[i].id, moveable:false}) 
		}; 
	}
		
	function UpdateTableView(){
		tableView.data = rowData;
	}
			
	function SaveAndSwitchToViewMode(categoryId){
		db.saveImageToCategory(image, categoryId);
		mode = "VIEW";
		UIForViewMode();
	}
	
	function UIForViewMode(){
		var editButton = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.EDIT});
		editButton.addEventListener('click', function(){
			var db = require('db');
			
			self.setRightNavButton(cancelButton);
			tableView.editing = true;
		});
		
		var cancelButton = Titanium.UI.createButton({
			title:'Cancel',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		cancelButton.addEventListener('click', function()
		{
			self.setRightNavButton(editButton);
			tableView.editing = false;
		});
	
		self.rightNavButton = editButton;
	}
	
	function UIForSaveMode(){
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
					
					//Add new row to tableView and categories
					UpdateCategoriesAndRowData();
					UpdateTableView();
					//tableView.appendRow(Ti.UI.createTableViewRow({title:e.text}));
					//categories.push({id:catId, name:e.text});
					
					//Open the gallery
					Ti.App.nav.open(new GalleryWindow(catId, e.text, true));
				}
			});
			dialog.show();
		});
		self.rightNavButton = addButton;
	}
	
	ConfigureTableViewEventListeners();
	UpdateCategoriesAndRowData();
	UpdateTableView();

	if(mode == "SAVE"){
		UIForSaveMode();		
	} else if(mode == "VIEW"){
		UIForViewMode();
	}

	self.add(tableView);
	return self;
}

module.exports = CategoryWindow;