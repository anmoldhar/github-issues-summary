var app = angular.module('gitapi', []);
app.controller('issueCtrl',['$scope','$http', function($scope, $http){
	$scope.getGitIssues = function(){
		$scope.errorResponse = false;
		$scope.loaded = false;
		console.log("URL is:"+$scope.url);
		//convert url to https://api.github.com/repos/Shippable/support
		var url_array = $scope.url.split('/');
		var total_issues_url = "https://api.github.com/repos/"+url_array[3]+"/"+url_array[4];
		$http.get(total_issues_url)
		.success(function(data){
			$scope.total_issues = data.open_issues_count;
			$scope.loaded = true;
			//console.log("Data Recieved:"+JSON.stringify(data) + "\nopen issues:" + $scope.total_issues);
			console.log("open issues count: " + $scope.total_issues);
		})
		.error(function(){
			$scope.errorResponse = true;
		});
		var dateObj = new Date();
		dateObj.setDate(dateObj.getDate()-1);
		var issues_yest_url = "https://api.github.com/repos/"+url_array[3]+"/"+url_array[4] + "/issues?since="+ dateObj.toISOString();
		console.log("yesterday issue_url is:"+ issues_yest_url + "date is " + dateObj.toISOString());
		$http.get(issues_yest_url)
		.success(function(data){
			data = data.filter(function(value) {
				var createdDate = new Date(value.created_at);
				//console.log('\n'+ value.created_at +'\n');
				//console.log('createdDate:' + createdDate + 'DateObj: ' + dateObj + '\n');
				//console.log(createdDate > dateObj);
				return createdDate > dateObj;
			});
			$scope.total_issues_yest = data.length;
			$scope.loaded = true;
			//console.log("Yesterday issue Data Recieved:"+JSON.stringify(data) + "\nopen issues yesterday:" + $scope.total_issues_yest);
			console.log("open issues yesterday count: " + $scope.total_issues_yest);
		})
		.error(function(){
			$scope.errorResponse = true;
		});
		var sevenDateObj = new Date();
		sevenDateObj.setDate(sevenDateObj.getDate()-7);
		var issues_seven_url = "https://api.github.com/repos/"+url_array[3]+"/"+url_array[4] + "/issues?since="+ sevenDateObj.toISOString();
		console.log("seven days issue_url is:"+ issues_seven_url + "date is " + dateObj.toISOString());
		$http.get(issues_seven_url)
		.success(function(data){
				data = data.filter(function(value) {
				var createdDate = new Date(value.created_at);
				//console.log('\n'+ value.created_at +'\n');
				//console.log('createdDate:' + createdDate + 'DateObj: ' + dateObj + '\n');
				//console.log(createdDate > dateObj);
				return createdDate > sevenDateObj;
				});
			$scope.total_issues_seven = data.length;
			$scope.loaded = true;
			//console.log("Yesterday issue Data Recieved:"+JSON.stringify(data) + "\nopen issues yesterday:" + $scope.total_issues_yest);
			console.log("open issues count seven days : " + $scope.total_issues_seven);
		})
		.error(function(){
			$scope.errorResponse = true;
		});
	};
}]);
