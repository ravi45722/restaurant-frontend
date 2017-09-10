app.controller('signinController', function($scope,$http,$location) {
	$scope.submitData = function () {
		$http({
			method: 'POST',
			url: 'http://172.16.23.20:8000/restregister',
			headers: {
      				accept: 'application/json'
			},
			data: {
				name : $scope.name,
				email : $scope.email,
				passport : $scope.passport,
				password : $scope.password,
			}
		}).then(function successCallback(response) {
	    	if(response.status== 200){
	    		console.log("User Created Successfully");
	    		console.log(response);
	    		$location.path('/login');
	    	} else {
				console.log("Login Failure");	    		
	    	}
	    }, function errorCallback(response) {
	    	console.log('status'+response.status)
	    })
	}
})