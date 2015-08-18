var app = angular.module('app', ['dpd', 'ngResource',  'ui.bootstrap'] )
    .value('dpdConfig', {     // alt     //.value('dpdConfig',['apiresources'])
        collections: ['apiresources'],
        socketOptions: { reconnectionDelayMax: 3000 }, // optional socket io additional configuration
        useSocketIo: true,
        noCache: false
    })
    .controller('astController', ['$scope', 'dpd', '$q', '$http', 'geo', 'ss',  function($scope, dpd, $q,  $http, geo, ss){

        var maxAllowedResults = +28; //cant be less than oneWeek
        $scope.locationQuery = ''; //'1468 8th Street West Park Forest, IL 60466';
        $scope.orderByField = 'date';
        $scope.reverseSort = false;
        $scope.statusStart = { opened: false };
        $scope.statusEnd = { opened: false };

        /**
         * spec
         * @type {{geoLoc: {}, geoLocGa: {}, solarTime: {}}}
         */
        $scope.spec = {
            geoLoc: {}, //msdn
            geoLocGa: {}, //Google
            solarTime: {} //Sunrise Sunset
        };

        /**
         * response
         * @type {{geo: {}, solar: Array}}
         */
        $scope.response = {
            geo: {
                formattedAddress: null
            },
            solar: []  //to toggle ng-show
        }

        /**
         * today()
         */
        $scope.today = function() {
            $scope.dateToStart = new Date();
        }
        $scope.today();

        /**
         *
         * @param date
         */
        $scope.oneWeek = function(date) {
                var oneWeek  = moment(date).add(7,'d');
            $scope.dateToEnd  = new Date(oneWeek);
        };
        $scope.oneWeek();

        /**
         *
         * @param date
         */
        $scope.fourWeeks = function(date) {
            var fourWeeks  = moment(date).add(28,'d');
            $scope.dateToEnd  = new Date(fourWeeks);
        };

        /**
         * openEndDate()
         * @param $event
         */
        $scope.openEndDate = function($event) {
            $scope.statusEnd.opened = true;
        };

        /**
         *
         */
        $scope.replaceToNew = function(){
            $('#sunset-sunrise').stop(true, true).fadeOut({ duration: 750, queue: false }).slideUp(1500);
            $('#solar-detail').fadeOut(750);
        }

        /**
         *
         */
        $scope.replaceToTable = function(){
            $('#sunset-sunrise').stop(true, true).fadeIn({ duration: 1250, queue: false }).css('display', 'none').slideDown(1250);
            $('#solar-detail').fadeOut(750);
        }

        /**
         *
         */
        $scope.replaceToDetail = function(){
            $scope.replaceToNew();
            $('#solar-detail').stop(true, true).fadeIn({ duration: 1250, queue: false }).css('display', 'none').slideDown(1250);
        }

        /**
         * openStartDate
         * @param $event
         */
        $scope.openStartDate = function($event) {
            $scope.statusStart.opened = true;
        };

        /**
         *
         * @param index
         */
        $scope.openDetails = function(index){
            $scope.replaceToDetail();
            $scope.solarDetails = $scope.response.solar[index];
        }

        /**
         * submit()
         */
        $scope.submit = function() {
            $scope.replaceToNew(); //get view moving
            $scope.locationQuery == '' ? $scope.locationQuery = 'Space Needle' : null; //Sydney. AU, Space Needle,  etc..
            $scope.dateToStart = this.dateToStart;
            $scope.dateToEnd = this.dateToEnd;
            $scope.ssTimes = [];
            $scope.solarDetails = {};

            var filter1 = "YYYY-MM-DD",
                selectedDays = Math.round(($scope.dateToEnd - $scope.dateToStart) /1000/60/60/24) + 1;  //calculate for display possibly, adding 1 because the difference doesn't include the first

            if( +maxAllowedResults < +selectedDays){ //cap it
                 $scope.fourWeeks($scope.dateToStart);  // WARNING, needs to go after  $scope.dateToEnd = this.dateToEnd;
                //// @ todo paginate, instead of clip
                $scope.maxReached = true;
            } else {
                $scope.maxReached = false;
            }

            /**
             *
             * leaving this here until time is warranted to spend on research on the angular call, jsonp callback, and msdn and or google
             * It may be something simple, because the results are the same from both.
             * To test, change  geo.dummyGet({address... above to geo.get({address.. , then view  the console logs
             */
        console.log('dummyGet()');  //uses a pre-specified coordinates, instead of doing the lookup
        //fetch fido
        $scope.responsePromise  = geo.dummyGet({address: $scope.locationQuery}).$promise;  //alt, $scope.responsePromise = geo.get({address: this.locationQuery}); //call geo
        $scope.responsePromise = $scope.responsePromise.then(
            function(geoResultPromise) { // now call solar with these geo results
                $("#spinner").show();
                var promises = [];
                $scope.response.geo.lat = geoResultPromise.results[0].geometry.location.lat; //only necessary if we want to see this on the view
                $scope.response.geo.lng = geoResultPromise.results[0].geometry.location.lng; //only necessary if we want to see this on the view
                $scope.response.geo.formattedAddress = geoResultPromise.results[0].formatted_address; //only necessary if we want to see this on the view
                $scope.ssTimesArray = [];
                moment.range($scope.dateToStart, $scope.dateToEnd).by('days',function (thisDate) { //iterate  solar api calls
                        var iMoment = moment(thisDate),
                            deferred = $q.defer(),
                            tempPromise = ss.get({ //iterate for each day, get ss times, e.g. api url: http://api.sunrise-sunset.org/json?callback=angular.callbacks._0&lat=41.5169128&lng=-87.6688492&myDates={%22startDate%22:%222015-08-11T07:00:00.000Z%22,%22endDate%22:%222015-08-11T07:00:00.000Z%22}
                        lat: geoResultPromise.results[0].geometry.location.lat, //were taking the first (0) result, which is the most likely.  the service offer multiple results if you look closer at teh object, for a broad string search
                        lng: geoResultPromise.results[0].geometry.location.lng,
                        date: iMoment.format(filter1)
                    }).$promise;
                    tempPromise.then(
                            function(data){
                                deferred.resolve(data); //now resolve it INSIDE the ACTUAL SS call, and the  SS CALL (all()) WONT start  until the loop is complete.
                                var d = new Date(),
                                    localoffset = d.getTimezoneOffset() * 60000,
                                    sunriseMoment = moment(data.results.sunrise , 'H:mm:ss: A'),
                                    sunriseMomentCorrected = sunriseMoment.add(localoffset, 'seconds'),
                                    sunriseFormatted = sunriseMomentCorrected.format("H:MM:ss A"),
                                    sunsetMoment = moment(data.results.sunset , 'h:mm"ss a'),
                                    sunsetMomentCorrected = sunsetMoment.add(localoffset, 'seconds'),
                                    sunsetFormatted = sunsetMomentCorrected.format("H:MM:ss A"),
                                    rfNauticalAfternoonMoment =  moment(data.results.nautical_twilight_end , 'H:mm:ss: A').subtract(moment(data.results.solar_noon , 'H:mm:ss: A')),
                                    rfNauticalAfternoonFormatted = rfNauticalAfternoonMoment.format("H:MM:ss");

                                data.results.rf_nautical_afternoon = rfNauticalAfternoonFormatted;
                                data.results.sunrise = sunriseFormatted;
                                data.results.sunset = sunsetFormatted;
                                data.results.date = iMoment.format(filter1);
                                $scope.ssTimes.push(data.results);
                            });
                    promises.push(deferred.promise);
                });
                $q.all(promises).then(
                    function(results){
                        $scope.response.solar = $scope.ssTimes;
                        $scope.displayCount =  moment().utc(moment($scope.dateToEnd) - moment($scope.dateToStart)).format('D');
                    }
                ).then(function(results){
                        $scope.replaceToTable();
                        $("#spinner").hide();
                        console.log('FINALE, EVERYTHING IS COMPLETE and should be on display');
                    },
                    function(data, status, headers, config) {
                        console.log(status);
                })
                .finally(function(){
                    //console.log('FINALLY!');
                });
            });
        }

        dpd.apiresources.get({codeName: 'geo-loc-ga'})
            .success(function(apiSpecs){
                $scope.spec.geoLocGa.urlParams = apiSpecs[0].urlParams;
                $scope.spec.geoLocGa.queryParams = apiSpecs[0].queryParams;
                $scope.spec.geoLocGa.uri = apiSpecs[0].uri;
                return apiSpecs;
            })
            .error(function(data, status, err, config){
                console.log('err');
                console.log(data, status, err, config);
            });

        dpd.apiresources.get({codeName: 'geo-loc-msdn'})
            .success(function(apiSpecs){
                $scope.spec.geoLoc.urlParams = apiSpecs[0].urlParams;
                $scope.spec.geoLoc.queryParams = apiSpecs[0].queryParams;
                $scope.spec.geoLoc.uri = apiSpecs[0].uri;
            })
            .error(function(data, status, err, config){
                console.log('err');
                console.log(data, status, err, config);
            });

        dpd.apiresources.get({codeName: 'solar-ss'})
            .success(function(apiSpecs){
                $scope.spec.solarTime.urlParams = apiSpecs[0].urlParams;
                $scope.spec.solarTime.queryParams = apiSpecs[0].queryParams;
                $scope.spec.solarTime.uri = apiSpecs[0].uri;
                return apiSpecs;
            })
            .error(function(data, status, err, config){
                console.log('err');
                console.log(data, status, err, config);
            });
    }]);
