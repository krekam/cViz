'use strict';

var constants         = require('../../scripts/constants');
var dataService     = require(constants.paths.services + '/visits');
var logger     = require(constants.paths.scripts + '/logger');
var dataSetParam    = require(constants.paths.config + '/app');

var controller = {}

controller.getAll     = getAll;
controller.create     = create;

controller.getOneById = getOneById;
controller.updateById = updateById;
controller.deleteById = deleteById;

controller.getWithAction = getWithAction;
controller.getvalidationById = getvalidationById;
controller.getVisitStats = getVisitStats;
controller.getCount = getCount;

module.exports = controller;

function getAll(req,res){
  dataService.getAll()
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

/*function getAll(req,res){
    // console.log("---------- in getAll of controller")
  var perPage = dataSetParam.appInfo.UI.pagination.size;
  var page = 0;
  if(req.query.query!==undefined)
  {
    var query = JSON.parse(req.query.query);
  }
  if(req.param('start')!==undefined)
  {
    var page = Math.max(0, req.param('start'));
  }
  if(req.param('size')!==undefined)
  {
    var perPage = Math.min(25,req.param('size'));
  }
  var fields = req.param('fields');
  var sort = req.param('sort');

  // console.log(" in getAll ----- page,perPage,sort,query,fields = " , page,perPage,sort,query,fields)
  
  dataService.getAll(page,perPage,sort,query,fields)
    .then(function(visitList){
        if (visitList){
            res.send(visitList);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}*/

function getOneById(req,res){
  dataService.getOneById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}



function getWithAction(req, res){

	switch(req.params.action.toLowerCase())
	{
        case "schedules":
            getSchedulesById(req,res);
            break;

		case "sessions":
			getSessionsById(req, res);
			break;

		case "my":
            getMyVisits(req, res);
			// getAll(req, res);
			break;

		case "activevisit":
			getActiveVisit(req, res);
			break;

		case "execs":
			getExecsById(req, res);
			break;

        case "overallfeedbackexecs":
            getParticipantsFeedback(req,res);
            break;

        case "orderexecs":
            orderexecsId(req,res);
            break;

        case "keynotes":
            getKeynotesById(req,res);
            break;

		case "pushsession":
			pushSession(req,res);
			break;

        case "getlocations":
            getLocationsById(req,res);
            break;

        case "getlasttimesessions":
            getLastTimeSessionsById(req,res);
            break;

        case "getallsessions": 
            getAllSessionsById(req,res);
            break;

        case "getofferingsheads":
            getOfferingsHeadsById(req,res);
            break;

        case "getregionsheads":
            getRegionsHeadsById(req,res);
            break;
        case "updatesessions":
            updateSessions(req,res);
            break;

		default:
			res.send("Invalid action");
	}
}


function getOfferingsHeadsById(req, res) {
    dataService.getOfferingsHeads(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}


function getRegionsHeadsById(req, res) {
    dataService.getRegionsHeads(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}



function getMyVisits(req,res){
	var timeline = (req.param('timeline')===undefined)? "all": req.param('timeline');
	var limit = (req.param('limit')==undefined)? 25: req.param('limit');

  var perPage = dataSetParam.appInfo.UI.pagination.size;
  var page = 0;
  if(req.query.query!==undefined)
  {
    var query = JSON.parse(req.query.query);
  }
  if(req.param('start')!==undefined)
  {
    var page = Math.max(0, req.param('start'));
  }
  if(req.param('size')!==undefined)
  {
    var perPage = Math.min(25,req.param('size'));
  }
  var fields = req.param('fields');
  var sort = req.param('sort');

  dataService.getMyVisits(req.user, timeline, limit, page, perPage, sort, query, fields)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}
function getSessionsById(req,res){
  dataService.getSessionsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getSchedulesById(req,res){
  dataService.getSchedulesById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getActiveVisit(req, res){
	dataService.getMyVisits(req.user,"next-one")
		.then(function(data){
				if (data){
					res.send(data["next-one"]);
				}else {
						logger.Json("No active visits");
						res.status(404).send("No active visits");
				}
		})
		.catch(function (err){
				console.log("exception" + err);
				res.status(500).send(err);
		});
}

function getExecsById(req,res){
  dataService.getParticipantsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Executive Bios for the visit not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}


function getParticipantsFeedback(req,res){
  dataService.getParticipantsForOverAllFeedback(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Users for the visit overall feedback not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function orderexecsId(req,res){
  dataService.getParticipantsByIdOrdering(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Users for the visit overall feedback not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getKeynotesById(req,res){
    var visitid;

    dataService.getMyVisits(req.user,"next-one")
    .then(function(data){
        if (data){

            if(req.params.id != "current")
                visitid = req.params.id;
            else
                visitid = data["next-one"].visits._id;

              dataService.getKeynotesById(visitid)
                .then(function(data){
                    if (data){
                        res.send(data);
                    }else {
                        res.status(404).send("Keynotes for the visit not found");
                    }
                })
                .catch(function (err){
                    console.log("exception" + err);
                    res.status(500).send(err);
                });
        }

        else {
            logger.Json("No active visits");
            res.status(404).send("No active visits");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function pushSession(req,res){
	var visitId = req.params.id;
	var sessionId = req.param('sessionId');
	var time = req.param('time');
    var sesnstatus = req.param('sesnstatus');
    var ssnpushtype = req.param('ssnpushtype');

  dataService.pushSession(sessionId, time, sesnstatus, ssnpushtype)
    .then(function(data){
        res.status(200).send(data);
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}


function  updateSessions(req, res) {
 var visitId = req.params.id;
 var allSessions = req.param('allSessions');

  dataService.updateSessions(allSessions)
    .then(function(data) {   
     if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }})
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}


function getLocationsById(req,res){
  dataService.getLocationsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Location for the visit not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}


function getVisitStats(req,res){
  dataService.getVisitStats()
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getLastTimeSessionsById(req,res){
  dataService.getLastTimeSessionsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getAllSessionsById(req,res){
  dataService.getAllSessionsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function create(req, res) {
  dataService.create(req.body,res)
    .then(function (data) {
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Doc not added");
        }
    })
    .catch(function (err) {
        console.log("cntrl create: err - " + err);
        res.status(500).send(err);
    });
}

function deleteById(req, res) {
  dataService.deleteById(req.params.id)
    .then(function () {
        res.status(200).send("Doc deleted successfully");
    })
    .catch(function (err) {
        console.log("controller delete err: " + err);
        res.status(500).send(err);
    });
}

function updateById(req, res) {
  dataService.updateById(req.params.id, req.body)
    .then(function () {
        res.status(200).send("Doc updated successfully");
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}

function getvalidationById(req,res){
  dataService.getvalidationById(req.params.id, req.body)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getCount(req,res){
  dataService.getCount()
    .then(function(visitCount){
        if (visitCount){
            res.send(visitCount);
        }else {
            res.status(404).send("Doc not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}  


