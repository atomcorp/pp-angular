// Results Service

app.service('getResultsService', ['$http', function($http) {

	var self = this;

	self.requestResults = function() {
		return $http.get('/app/example-data/results.json')
			.success(function(response) {
				return response;
			});
	}

}]);

app.service('makeResults', [function() {

	this.loopResults = function(data) {
		console.log('makeResults', data);
		list = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].gameweek === 1) {
				var result = {};
				result.homeScore = data[i].homeScore;
				result.awayScore = data[i].awayScore;
				result.matchId = data[i].id;
				list.push(result);
			}
		};
		console.log('list', list);
		return list;
	}	

}]);