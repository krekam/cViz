console.log("CVM Data Migration");
console.log();

var constants       		= require('../../scripts/constants');
var util					= require(constants.paths.scripts + "/util");
var secure					= require(constants.paths.scripts + "/secure");

// var modelTaskDefinition		= require(constants.paths.models + '/taskDefinition');
// var modelTaskResponse       = require(constants.paths.models +  '/taskResponse');
// var modelChannel            = require(constants.paths.models + '/channel');
var userModel               = require(constants.paths.models +  '/user');
var _ 						= require('underscore');
// var csv 					= require('fast-csv');
// var fs 						= require('fs');
var alasql 					= require('alasql');
// var stream 					= fs.createReadStream("all_Employees.csv");
require(constants.paths.scripts + '/database'); // load database management scripts


// var stream = fs.createReadStream("dummy.csv");

// csv
// .fromStream(stream, {headers : true})
// .on("data", function(data){
// 	console.log(data);
// 	var user = new userModel({

// 		name 				: {
// 		    last 			: ".", 
// 		    first 			: data.EmpName
// 		},
// 	    jobTitle			: data.DeptDesc,
// 	    contactNo			:[{
// 	    	contactNumber	: data.ContactNo
// 	    }],
// 	    email				: data.EmpShortID + "@csc.com",
//         status				: data.EmpStatusDesc

// 	});

// 	user.save(function(err) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		console.log('users saved successfully');
// 	});
// })
// .on("end", function(){
// 	console.log("done");
// });


alasql.promise('select * from xlsx("visitPlusData.xlsx", {headers:true, sheetid: "VM_Locations"})')
	.then(function(res){
		console.log(res);
	}).catch(function(err){
		console.log(err);
	});