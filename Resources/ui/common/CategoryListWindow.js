function CategoryListWindow(){
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		title:'Categories'
	});
	
	var db = require('db');
	
	
	//TableView
	var categories = db.getAllCategories();
	var data = [];
	
	for(var i=0,j=categories.length; i<j; i++){
	  data[i] = Ti.UI.createTableViewRow({title:categories[i].name, hasDetail:true}) 
	};
	
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	self.add(tableview);
	
	return self;
}

module.exports = CategoryListWindow;