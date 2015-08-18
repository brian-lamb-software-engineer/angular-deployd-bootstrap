var submittedLoc = this,
    apiQueueSpec,
    queryStringGeoLoc,
    responseGeoLocData;
    
dpd.api-resources.get({codeName:geo-loc-msdn}, function(params){
    
    /*subs.forEach(function(k,p){*/
    
        apiQueueSpec.k.uri = params.uri;
        apiQueueSpec.k.urlParams = params.urlParams;
        apiQueueSpec.k.queryParams = params.queryParams;
        
        if(apiQueueSpec.k.urlParams){ //parse url params
            apiQueueSpec.k.urlParams.forEach(uP){
                //uP
                //queryStringGeoLoc
            }
        }
        
        if(apiQueueSpec.k.queryParams){ //parse query params
            apiQueueSpec.k.queryParams.forEach(qP){
                //qP
                //queryStringGeoLoc
            }
        }
        
    /*})*/
    
    
    /**
     * get 3rd party api({address: streetAddress, zip:zip, country:region})
     * 
     * dep stuiff
     *   
     * //dpd.pulledGeoLocData.get({address:location.streetAddress, zip:zip, country:region}, function(callbackName)); //use api to get data based on what was just posted

     */
    //make api call NOW with this data to msdn geo-loc-msdn
    responseGeoLocData = 'nothing yet'; //.get(queryStringGeoLoc)
    
});



//return results
console.log(responseGeoLocData);
    


/**
 //realtime api example angular example http://docs.deployd.com/docs/collections/reference/http.html#s-Creating an Object-1286
  function Controller($scope, $http) {
  $http.get('/todos')
    .success(function(todos) {
      $scope.todos = todos;
    })
    .error(function(err) {
      alert(err);
    });

  $http.post('/todos', {
      title: "Walk the dog"
    })
    .success(function(todo) {
      // Do something
    })
    .error(function(err) {
      alert(err);
    });
}

*/

