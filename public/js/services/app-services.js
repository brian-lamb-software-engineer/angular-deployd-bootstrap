/**
*
 MAYBE RELEVANT:
 BREAKING CHANGE: resource instance does not have `$then` function anymore.
 Before:
 Resource.query().$then(callback);
 After:
 Resource.query().$promise.then(callback);
 BREAKING CHANGE: instance methods return the promise rather than the instance itself.
 Before:
 resource.$save().chaining = true;
 After:
 resource.$save();
 resourve.chaining = true;

 DEFINITELY RELEVANT:
 BREAKING CHANGE: On success, promise is resolved with the resource instance rather than http  response object.
 Use interceptor to access the http response object.
 Before:  Resource.query().$then(function(response) {...});
 After:  var Resource = $resource('/url', {}, {
  get: {
    method: 'get',
    interceptor: {
      response: function(response) {
        // expose response
        return response;
      }}}});
 */

/**
 // @todo pass scope to geoService, then remove hard coded urls
 $scope.spec.geoLoc.url = $scope.spec.geoLoc.uri +
 '?query=' + encodeURIComponent(this.locationQuery) +
 '&maxResults=10' +
 '&key=' + encodeURIComponent($scope.spec.geoLoc.queryParams.key) +
 '&callback=JSON_CALLBACK';
 $scope.spec.geoLocGa.url = $scope.spec.geoLocGa.uri +
 '?address=' + encodeURIComponent(this.locationQuery) +
 '&key=' + encodeURIComponent($scope.spec.geoLocGa.queryParams.key) +
 '&callback=JSON_CALLBACK';
 $scope.spec.solarTime.url = $scope.spec.solarTime.uri +
 '?lat=' + encodeURIComponent($scope.spec.solarTime.lat) +
 '?long=' + encodeURIComponent($scope.spec.solarTime.lng) +
 '?date=' + encodeURIComponent($scope.spec.solarTime.myDates);
 *
 */

angular.module('app')
    .factory('geo',
        function($resource) {
            return $resource('https://maps.googleapis.com/maps/api/geocode/json', { address: '@address'},
            {
                get: {
                    method: 'JSONP',
                    interceptor: {  //Hmm, not working, would be nice though!    //https://docs.angularjs.org/guide/migration#resource-promises-are-resolved-with-the-resource-instance
                        response: function(response) {
                            // @ todo
                            alert('INSIDE INTERCEPTOR FINALLY, this part can be coded now');
                            // expose response
                            //callback now??
                            return response;
                        }
                    },
                    params: {
                        //someParam: someValue,
                        callback: 'JSON_CALLBACK'
                    }
                },
                dummyGet:{
                    "results" : [
                        {
                            "address_components" : [
                                {
                                    "long_name" : "1468",
                                    "short_name" : "1468",
                                    "types" : [ "street_number" ]
                                },
                                {
                                    "long_name" : "8th Street",
                                    "short_name" : "8th St",
                                    "types" : [ "route" ]
                                },
                                {
                                    "long_name" : "Chicago Heights",
                                    "short_name" : "Chicago Heights",
                                    "types" : [ "locality", "political" ]
                                },
                                {
                                    "long_name" : "Bloom",
                                    "short_name" : "Bloom",
                                    "types" : [ "administrative_area_level_3", "political" ]
                                },
                                {
                                    "long_name" : "Cook County",
                                    "short_name" : "Cook County",
                                    "types" : [ "administrative_area_level_2", "political" ]
                                },
                                {
                                    "long_name" : "Illinois",
                                    "short_name" : "IL",
                                    "types" : [ "administrative_area_level_1", "political" ]
                                },
                                {
                                    "long_name" : "United States",
                                    "short_name" : "US",
                                    "types" : [ "country", "political" ]
                                },
                                {
                                    "long_name" : "60411",
                                    "short_name" : "60411",
                                    "types" : [ "postal_code" ]
                                }
                            ],
                            "formatted_address" : "1468 8th Street, Chicago Heights, IL 60411, USA",
                            "geometry" : {
                                "bounds" : {
                                    "northeast" : {
                                        "lat" : 41.5169266,
                                        "lng" : -87.6688492
                                    },
                                    "southwest" : {
                                        "lat" : 41.5169128,
                                        "lng" : -87.6688494
                                    }
                                },
                                "location" : {
                                    "lat" : 41.5169128,
                                    "lng" : -87.6688492
                                },
                                "location_type" : "RANGE_INTERPOLATED",
                                "viewport" : {
                                    "northeast" : {
                                        "lat" : 41.51826868029151,
                                        "lng" : -87.66750031970849
                                    },
                                    "southwest" : {
                                        "lat" : 41.51557071970851,
                                        "lng" : -87.6701982802915
                                    }
                                }
                            },
                            "partial_match" : true,
                            "place_id" : "Ei8xNDY4IDh0aCBTdHJlZXQsIENoaWNhZ28gSGVpZ2h0cywgSUwgNjA0MTEsIFVTQQ",
                            "types" : [ "street_address" ]
                        }
                    ],
                    "status" : "OK"
                }
            });
        })
        .factory('ss',
            function($resource) {
                return $resource('http://api.sunrise-sunset.org/json', {lat: '@lat', lng: '@lng', date: '@date'},
                {
                    get: {
                        method: 'JSONP',
                        params: {
                            //someParam: someValue,
                            callback: 'JSON_CALLBACK'
                        }
                    }
                });
        });
