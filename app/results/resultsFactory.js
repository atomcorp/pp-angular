// Results Factory

app.factory('resultsFactory', ['getResultsService', 'makeResults', function(getResultsService, makeResults) {

	return {
		runResults: getResultsService.requestResults()
			.then(function(data){
				var data = data.data;
				return data;
			}).then(function(data) {
				var results = makeResults.loopResults(data);
				return results;
			})
	}
}]);
