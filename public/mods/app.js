'use strict';

var adminModule = angular.module('cviz-admin', ['users','confirmDialogDirective','tooltips','appUserService','appInfoService','paginationService']);

var customizeModule = angular.module('cviz-customize',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker',
	'keynotes','facts','feedback','teasers','lovs', 'confirmDialogDirective','contactList','richTextDirective','ngRateIt','feedbackDirective','dropzone','meetingPlaces', 'tooltips','angucomplete','userAutoDirective','angucomplete-alt','angucomplete-alter','appUserService','appInfoService','paginationService']);

var manageModule = angular.module('cviz-manage',
	['userprofileDirective','userDirective','userdisplayDirective', 'clientDisplayDirective', 'inviteesDirective',
	'appFilters',
	'datePicker','fileuploadDirective',
	'visits',"clients",'confirmDialogDirective','richTextDirective','ngRateIt','tooltips','dropzone','angucomplete','userAutoDirective','angucomplete-alt','angucomplete-alter','appUserService','appInfoService','paginationService']);

var profileModule = angular.module('cviz-profile',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker','dropzone','fileuploadDirective',
	'profile','userAutoDirective','appUserService','appInfoService','paginationService']);

var serv = angular.module('appUserService', []);
var appInfo = angular.module('appInfoService',[]);
var pagination = angular.module('paginationService', []);

serv.factory('appUserService', ['$http', '$q', function ($http, $q){

	 var appUserService =  {};

	 appUserService.activeUser = function () {

			 var defer = $q.defer();

			 $http.get('/token',{
				 cache: true
			 }).success(function(response) {
			 	  
				 if(response !== undefined){
					 defer.resolve(response);
				 }
				 else {
 					 //console.log("Not active visit");
					 defer.reject("No User Found");
				 }
			 });

			 return defer.promise;
	 }

	 return appUserService;

 }]);


appInfo.factory('appInfoService', ['$http', '$q', function ($http, $q){

    var appInfoService =  {};

    appInfoService.appInfo = function () {

            var defer = $q.defer();

            $http.get('/api/v1/app/info',{
                cache: true
            }).success(function(response) {
                  
                if(response !== undefined){
                    defer.resolve(response);
                }
                else {
                    defer.reject("No User Found");
                }
            });

            return defer.promise;
    }

     appInfoService.appAuth = function() {
           var defer = $q.defer();

           $http.get('/api/v1/secure/app/auth',{
               cache: true
           }).success(function(response) {

             if(response !== undefined){
                 defer.resolve(response);
             }
             else {
                defer.reject("No Info Found");
             }
          });

        return defer.promise;
    }

     return appInfoService;

 }]);

pagination.factory('PagerService', PagerService)

function PagerService() {
    // service definition
    var service = {};

    service.GetPager = GetPager;

    return service;

    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 5
        pageSize = pageSize || 5;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 5) {
            // less than 5 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 5 total pages so calculate start and end pages
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}



adminModule.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
      	config.headers = config.headers || {};
      	if(config.data!=null)
      	{
      		if(config.data.jobTitle!=null)
      		{
      			var clean = htmlToPlaintext(config.data.jobTitle);
      			config.data.jobTitle = clean;
      		}

      		if(config.data.summary!=null)
      		{
      			var clean = htmlToPlaintext(config.data.summary);
      			config.data.summary = clean;
      		}

      		if(config.data.name!=null)
      		{	
      			if(config.data.name.first==null)
      			{	
      			var clean = htmlToPlaintext(config.data.name);
      			config.data.name = clean;
      			}
      		}

      		if(config.data.description!=null)
      		{
      			var clean = htmlToPlaintext(config.data.description);
      			config.data.description = clean;
      		}
      	}
      	config.headers['X-XSS-Protection'] = '1; mode=block';
      	return config;
      }
  };
  });
});

customizeModule.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
      	config.headers = config.headers || {};
      	if(config.data!=null)
      	{
      	if(config.data.values!=null)
      	{		
      	var length = config.data.values.length;
      	var dirty = config.data.values[length-1];
      	var clean = htmlToPlaintext(dirty);
      	config.data.values[length-1] = clean; 
      	}

		if(config.data.title!=null)
		{
			var clean = htmlToPlaintext(config.data.title);
			config.data.title = clean;	
		}  

		if(config.data.desc!=null)
		{
			var clean = htmlToPlaintext(config.data.desc);
			config.data.desc = clean;	
		}  

		if(config.data.meetingPlace!=null)
		{
			var clean = htmlToPlaintext(config.data.meetingPlace);
			config.data.meetingPlace = clean;	
		}  

      	}
      	config.headers['X-XSS-Protection'] = '1; mode=block';
      	// console.log(config)
      	return config;
      }
  };
  });
});

manageModule.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if(config.data!=null)
        {
          if(config.data.name!=null)
          {
            if(config.data.name.first==null)
            { 
              var clean = htmlToPlaintext(config.data.name);
              config.data.name = clean;
            }
            
          }

          if(config.data.subName!=null)
          {
            var clean = htmlToPlaintext(config.data.subName);
            config.data.subName = clean;            
          }

          if(config.data.sfdcid!=null)
          {
            var clean = htmlToPlaintext(config.data.sfdcid);
            config.data.sfdcid = clean; 
          }

          if(config.data.netPromoter!=null)
          {
            var clean = htmlToPlaintext(config.data.netPromoter);
            config.data.netPromoter = clean; 
          }

          if(config.data.competitors!=null)
          {
            var clean = htmlToPlaintext(config.data.competitors);
            config.data.competitors = clean; 
          }

          if(config.data.wbsCode!=null)
          {
            var clean = htmlToPlaintext(config.data.wbsCode);
            config.data.wbsCode = clean;             
          }

          if(config.data.chargeCode!=null)
          {
            var clean = htmlToPlaintext(config.data.chargeCode);
            config.data.chargeCode = clean; 
          }

          if(config.data.session!=null)
          {
          if(config.data.session.title!=null)
          {
             var clean = htmlToPlaintext(config.data.session.title);
             config.data.session.title = clean; 
          }
        }
        }
        config.headers['X-XSS-Protection'] = '1; mode=block';
        return config;
      }
  };
  });
});

function htmlToPlaintext(text) {
  
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}
