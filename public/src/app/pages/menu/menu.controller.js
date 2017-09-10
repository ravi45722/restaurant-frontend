app.controller('menuController', function($scope,$http,$location) {
	$scope.$watch('$viewContentLoaded', function() {
		$scope.getCategories();
	});

	$scope.tabs = [{
			title: 'Menu',
			url: 'menu.tpl.html'
		}, {
			title: 'Reviews',
			url: 'reviews.tpl.html'
        }, {
			title: 'Info',
			url: 'info.tpl.html'
    }];

    $scope.currentTab = 'menu.tpl.html';

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}
    
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}


	$scope.orderedList = {};
	$scope.orderedItems = [];

	$scope.basketList = function (content,item) {
		$scope.orderedItems.push(content);
		$scope.orderedItems = [...new Set($scope.orderedItems)]
		//console.log(content,item);
		if ($scope.orderedList[content]) {
			if ($scope.orderedList[content][item.item]) {
				$scope.orderedList[content][item.item]['count']++;
			} else {
				$scope.orderedList[content][item.item] = {};
				$scope.orderedList[content][item.item]['count'] = 1;
				$scope.orderedList[content][item.item]['cost'] = item.value;
			}
		} else {
			$scope.orderedList[content] = {};
			$scope.orderedList[content][item.item] = {};
			$scope.orderedList[content][item.item]['count'] = 1;
			$scope.orderedList[content][item.item]['cost'] = item.value;
 		}
		console.log(JSON.stringify($scope.orderedList));
		//console.log($scope.orderedItems);
	}

	$scope.getSublist = function (category) {
		$scope.selectedCategory = category;
		console.log($scope.selectedCategory);
	}

	$scope.getCategories = function () {
		$http({
			method: 'POST',
			url: 'http://172.16.23.20:8000/restgetMenu',
			headers: {
      				accept: 'application/json'
			},
			data: {}
		}).then(function successCallback(response) {
	    	if(response.status== 200){
	    		console.log("Login Success");
	    		console.log(response.data);
	    		$scope.menu = response.data;
	    		$scope.selectedCategory = response.data[0];
	    	} else {
				console.log("Login Failure");	    		
	    	}
	    }, function errorCallback(response) {
	    	console.log('status'+response.status)
	    })
	}
})