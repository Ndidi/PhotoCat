//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
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
	// label.addEventListener('click', function(e) {
		// alert(e.source.text);
	// });
	
	return self;
}

module.exports = FirstView;
