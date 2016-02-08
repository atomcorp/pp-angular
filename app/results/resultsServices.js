
app.service('getResultsService', ['$http', function($http) {

	var self = this;

	self.requestResults = function() {
		return $http.get('/app/example-data/results.json')
			.success(function(response) {
				return response;
			});
	}

}])