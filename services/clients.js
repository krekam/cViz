'use strict';

var Q               = require('q');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/client')
//var userModel           = require(constants.paths.models +  '/user')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getWithQuery = getWithQuery;
service.getWithName = getWithName;

module.exports = service;

// Method implementations
function getAll(){
    var deferred = Q.defer();

    model.find(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            deferred.resolve(list);
    });

    return deferred.promise;
} // getAll method ends

function getOneById(id){
    var deferred = Q.defer();

    model
    .findOne({ _id: id })
    .populate({path:'cscPersonnel.salesExec'})
    .populate({path:'cscPersonnel.accountGM'})
    .populate({path:'cscPersonnel.industryExec'})
    .populate({path:'cscPersonnel.globalDelivery'})
    .populate({path:'cscPersonnel.cre'})
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            console.log(item);
        deferred.resolve(item);
    });

    return deferred.promise;
} // gentOneById method ends

// function getWithQuery(query, fields, maxRecs, sortEx){
//     var deferred = Q.defer();

//     model
//     .find(query)
//     .limit(maxRecs)
//     .select(fields)
//     .sort(sortEx)
//     .exec(function (err, item) {
//         if(err) {
//             console.log(err);
//             deferred.reject(err);
//         }
//         else
//         {
//             console.log(item);
//             deferred.resolve(item);
//         }
//     });

//     return deferred.promise;
// } // getWithQuery method ends

function getWithQuery(query, fields, maxRecs, sortEx){

    var deferred = Q.defer();
    var clientArray = [];
    var clientDesig = [];
    var childArray = [];
    var childDesig = [];

    var industryArray = [];
    var industryDesig = [];
    
    var regionsArray = [];
    var regionsDesig = [];var m=0;
    model
    .find(query)
    .limit(maxRecs)
    .select('name subName industry regions _id')
    .sort(sortEx)
    .exec(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            console.log(list); 
        for(var i=0;i<list.length;i++)
        {        
            if(clientArray.indexOf(list[i].name) === -1){
                clientArray.push(list[i].name);
            }    

            if(childArray.indexOf(list[i].subName) === -1){
                childArray.push(list[i].subName);
            }
            if(industryArray.indexOf(list[i].industry) === -1){
                industryArray.push(list[i].industry);
            }
            if(regionsArray.indexOf(list[i].regions) === -1){
                regionsArray.push(list[i].regions);
            }
        }   
        console.log(clientArray);
        console.log(childArray);
        var data = clientArray;
        var data1 = childArray;
        var data2= industryArray;
        var data3= regionsArray;
        
        for (var i = 0; i < data.length; i++) {
            clientDesig.push({'parentClient':data[i]});
        }

        for(var k=0; k<data1.length;k++)
        {
            childDesig.push({'childClient':data1[k]});
        }
        for(var l=0; l<data2.length;l++)
        {
            industryDesig.push({'IndustryClient':data2[l]});
        }
        for(var m=0; m<data3.length;m++)
        {
            regionsDesig.push({'regionClient':data3[m]});
        }
        // console.log(list[m]._id);
        if(list[0]!= undefined ){
                var id=list[0].id;}else var id ="null";

        console.log(clientDesig.length);
        deferred.resolve
        ({
            "items": clientDesig,
            "items1": childDesig,
            "items2": industryDesig,
            "items3": regionsDesig,
            "id": id
        });
    });
return deferred.promise;
} // getAll method ends

function getWithName(name){
    var deferred = Q.defer();
    model
    .findOne({ name: name })
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            console.log(item);
        deferred.resolve(item);
    });

    return deferred.promise;
} // gentOneByName method ends

function create(data) {
    var deferred = Q.defer();

    console.log("Saving an Account........");
    console.log(data);
    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}

function updateById(id, data) {
    var deferred = Q.defer();

    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}

function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}