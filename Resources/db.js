var DATABASE_NAME = 'PhotoCat';

exports.createDb = function(){
	var db = Ti.Database.open(DATABASE_NAME);
	var existingTable = db.execute('SELECT name FROM sqlite_master WHERE type="table" AND name="categories"');
	if(!existingTable.isValidRow()){
		db.execute('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
		db.execute('CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY AUTOINCREMENT, image BLOB, category INTEGER, FOREIGN KEY(category) REFERENCES categories(id))');
		db.execute('INSERT OR IGNORE INTO categories SELECT 0 AS id, "Home" AS name UNION SELECT 1, "Work" UNION SELECT 2, "Holiday"');	
	}
	db.close();
}

exports.addCategory = function(_name){
	var db = Ti.Database.open(DATABASE_NAME);
	var rowCount = db.execute('SELECT * FROM categories where name == ? ', _name).getRowCount();
	if(rowCount===0){
		db.execute('INSERT INTO categories VALUES (NULL, ?)', _name);
	}
	db.close();
}

exports.getIdForCategoryName = function(_name){
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('SELECT id FROM categories WHERE name == ?', _name);
	var id;
	while(rows.isValidRow()){
		id = rows.fieldByName('id');
		rows.next();
	}
	db.close();
	return id;
}

exports.getAllCategories = function(){
	var db = Ti.Database.open(DATABASE_NAME);
	var retData = [];
	var rows = db.execute('SELECT * FROM categories');
	while(rows.isValidRow()){
		retData.push({id:rows.fieldByName('id'), name:rows.fieldByName('name')});
		rows.next();
	}	
	db.close();
	return retData;
}

exports.deleteCategory = function(_categoryId){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('DELETE FROM photos WHERE category == ?', _categoryId);
	db.execute('DELETE FROM categories WHERE id == ?', _categoryId);
	db.close();
}

exports.saveImageToCategory = function(_image, _category){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('INSERT INTO photos VALUES (NULL, ?, ?)', _image, _category);
	db.close();
}

exports.deleteImage = function(_imageId){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('DELETE FROM photos WHERE id == ?', _imageId);
	db.close();
}

exports.getImagesForCategory = function(_categoryId){
	var db = Ti.Database.open(DATABASE_NAME);
	var retData = [];
	var rows = db.execute('SELECT * FROM photos WHERE category==?',_categoryId);
	while(rows.isValidRow()){
		retData.push({id:rows.fieldByName('id'), image:rows.fieldByName('image'), category:rows.fieldByName('category')});
		rows.next();
	}
	db.close();
	return retData;
}
