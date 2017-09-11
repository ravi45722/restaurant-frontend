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
	$scope.min = 0;
	$scope.max = 1000;

	$scope.basketList = function (content,item) {
		$scope.orderedItems.push(content);
		$scope.orderedItems = [...new Set($scope.orderedItems)]
		console.log(content,item);
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

	$scope.updateMin = function (min){
		console.log(min);
		$scope.min = min;
		$scope.getSublist($scope.selectedCategory); 
	}

	$scope.updateMax = function (max) {
		console.log("In func"+max);
		$scope.max = max;
		$scope.getSublist($scope.selectedCategory);
	}

	$scope.getSublist = function (category) {
		$scope.selectedCategory = category;
		console.log(category);
		console.log($scope.max,$scope.min);
		$http({
			method: 'POST',
			url: 'http://172.16.23.27:6484/getSublist',
			headers: {
      				accept: 'application/json'
			},
			data: {
				Category : category,
				min : $scope.min,
				max : $scope.max,
			}
		}).then(function successCallback(response) {
			if (response.status == 200) {
				console.log(response.data);
				$scope.subMenu = response.data;
			} else {
				console.log($scope.selectedCategory);
			}
		}, function errorCallback(response){
			console.log('status'+response.status)
		})
	}

	$scope.getCategories = function () {
		$http({
			method: 'POST',
			url: 'http://172.16.23.27:6484/getMenu',
			headers: {
      				accept: 'application/json'
			},
			data: {}
		}).then(function successCallback(response) {
	    	if(response.status== 200){
	    		console.log("Login Success");
	    		
	    		var array = [];
	    		response.data.forEach(function(ele){
	    			array.push(ele.Content)
	    		});
	    		array = [...new Set(array)]
	    		$scope.menu = array;
	    		$scope.selectedCategory = array[0];
	    		$scope.getSublist(array[0]);
	    		console.log(array);
	    	} else {
				console.log("Login Failure");	    		
	    	}
	    }, function errorCallback(response) {
	    	console.log('status'+response.status)
	    })
	}
})