app.controller('loginController', function($scope,$http,$location) {
	$scope.validateUser = function () {
		$http({
	    	method: 'POST',
	    	url: 'http://172.16.23.27:6484/login',
	    	headers: {
      				accept: 'application/json'
			},
			data: {
				passport: $scope.passport,
				password: $scope.password,
			}
	    }).then(function successCallback(response) {
	    	if(response.status== 200){
	    		console.log("Login Success");
	    		console.log(response.data);
	    		$location.path('/menu');
	    	} else if (response.status== 401) {
				console.log("Login Failure");
				//Block the user based on the no of failue atempts	    		
	    	} else {
	    		//considering as backend error
	    		$location.path('/login');
	    	}
	    }, function errorCallback(response) {
	    	console.log('status'+response.status)
	    })
	}
})