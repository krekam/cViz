// config/app.js
 
 // AppInfo configuration parameters
 var pjson 		= require('../package.json');
 
 module.exports = {
 'appInfo':{
 	'name': pjson.name,
 	'title': pjson.siteTitle,
 	'author':pjson.author,
 	'description':pjson.description,
 	'version': pjson.version,
 	'UI':{
 		'pagination':{
 			'size': 10
 		}
 	}
 }
 };