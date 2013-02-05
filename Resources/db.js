var DATABASE_NAME = 'PhotoCat';

exports.createDb = function(){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY, base64image TEXT, category INTEGER, FOREIGN KEY(category) REFERENCES categories(id))');
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
	var rows = db.execute('SELECT * from categories');
	while(rows.isValidRow()){
		retData.push({id:rows.fieldByName('id'), name:rows.fieldByName('name')});
		rows.next();
	}
	db.close();
	return retData;
}