function CategoryListWindow(){
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Categories',
		navBarHidden:false
	});
	
	var db = require('db');
	
	//TableView
	var categories = db.getAllCategories();
	var data = [];
	
	//Using TableViewRow to hold the db id of a category until a better solution is found
	for(var i=0,j=categories.length; i<j; i++){
	  data[i] = Ti.UI.createTableViewRow({title:categories[i].name, hasChild:true}) 
	};
	
	var tableView = Titanium.UI.createTableView({
		data:data
	});
	
	tableView.addEventListener('click', function(e){
		var GalleryWindow = require('ui/common/GalleryWindow');
		Ti.App.nav.open(new GalleryWindow(e.index, categories[e.index].name));
		//index is the index of the clicked row. As we are not allowing table rows to be moved, this is fine.
	});
	
	self.add(tableView);
	
	return self;
}

module.exports = CategoryListWindow;