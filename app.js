var app = angular.module('gitapi', []);

// creting  issue controller and injecting http service for perform git api get requests and $scope to bind method/properties of controller
app.controller('issueCtrl',['$scope','$http', function($scope, $http){
	
	$scope.getGitIssues = function(){
		
		//errorResponse flag if we get some error while calling api
		$scope.errorResponse = false;
		
		//scope loaded flag to display summary only when we get success. Helps in creating single page application.
		$scope.loaded = false;
		
		// debug logs can be ignored
		console.log("URL is:"+$scope.url);
		
		//convert input url to https://api.github.com/repos/<user>/<repository>
		var url_array = $scope.url.split('/');
		var total_issues_url = "https://api.github.com/repos/"+url_array[3]+"/"+url_array[4];
		$http.get(total_issues_url)
		.success(function(data){
			
			// open_issues_count Key in above api json response indicates total oppen issues
			$scope.total_issues = data.open_issues_count;
			$scope.loaded = true;
			//console.log("Data Recieved:"+JSON.stringify(data) + "\nopen issues:" + $scope.total_issues);
			console.log("open issues count: " + $scope.total_issues);
		})
		.error(function(){
			$scope.errorResponse = true;
		});
		
		//get one day back date
		var dateObj = new Date();
		dateObj.setDate(dateObj.getDate()-1);
		
		//convert input url to https://api.github.com/repos/<user>/<repository>?since=<date>
		var issues_yest_url = "https://api.github.com/repos/"+url_array[3]+"/"+url_array[4] + "/issues?since="+ dateObj.toISOString();
		
		console.log("yesterday issue_url is:"+ issues_yest_url + "date is " + dateObj.toISOString());
		$http.get(issues_yest_url)
		.success(function(data){
			// reponse contains all issues UPDATE since yesterday but we want only issues CREATED since yesterday
			// we filter array based on creation date so it contains only issues created since yesterday
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
		
		//get date seven days past
		var sevenDateObj = new Date();
		sevenDateObj.setDate(sevenDateObj.getDate()-7);
		
		//convert input url to https://api.github.com/repos/<user>/<repository>?since=<date>
		var issues_seven_url = "https://api.github.com/repos/"+url_array[3]+"/"+url_array[4] + "/issues?since="+ sevenDateObj.toISOString();
		console.log("seven days issue_url is:"+ issues_seven_url + "date is " + dateObj.toISOString());
		
		$http.get(issues_seven_url)
		.success(function(data){
			// reponse contains all issues UPDATE since seven days but we want only issues CREATED since seven days
			// we filter array based on creation date so it contains only issues created since seven days
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
