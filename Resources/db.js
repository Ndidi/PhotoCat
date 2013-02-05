var DATABASE_NAME = 'PhotoCat';

exports.createDb = function(){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY, image BLOB, category INTEGER, FOREIGN KEY(category) REFERENCES categories(id))');
	db.execute('INSERT OR IGNORE INTO categories SELECT 1 AS id, "Home" AS name UNION SELECT 2, "Work" UNION SELECT 3, "Holiday"');
	db.close();
}

exports.addCategory = function(_name){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('INSERT INTO categories VALUES (NULL, ?)', _name);
	db.close();
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

exports.saveImageToCategory = function(_image, _category){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('INSERT INTO photos VALUES (NULL, ?, ?)', _image, _category);
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
