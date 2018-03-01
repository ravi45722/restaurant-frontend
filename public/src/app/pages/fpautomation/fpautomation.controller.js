app.controller('fpautomationController', function($scope,$http,$location) {
	$scope.submitData = function () {
		$http({
			method: 'POST',
			url: 'http://localhost:6484/fptool/',
			headers: {
      				accept: 'application/json'
			},
			data: {
				sid : $scope.sid,
				ip_string : $scope.ip_address,
			}
		}).then(function successCallback(response) {
	    	if(response.status== 200){
	    		console.log("Got Response Successfully");
	    		console.log(JSON.stringify(response.data));
	    		$scope.reasons_data = response.data
	    		var x = document.getElementById("result");
	    		x.style.display = "block";
	    		//$location.path('/login');
	    	} else {
				console.log("Something went wrong");	    		
	    	}
	    }, function errorCallback(response) {
	    	console.log('status'+response.status)
	    })
	}
})