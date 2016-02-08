var app = angular.module('app', []);

app.controller('homeController', [ function () {
	var self = this;

	self.title = 'Premier Predictions';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/

	// What a $$state is
	// http://stackoverflow.com/questions/30146045/how-to-access-json-object-state-value

}]);

app.controller('showFixturesController', ['predictionObjectFactory', 'fixturesFactory', 'calculatePointsService', 'getResultsService', function (predictionObjectFactory, fixturesFactory, calculatePointsService, getResultsService) {
	var self = this;

	fixturesFactory.run
		.then(function(data) {
			self.fixtures = data;
			self.fixtureAmount = self.fixtures.length;
			self.predictions = predictionObjectFactory.run(self.fixtureAmount);
			addPredictions(self.fixtures, self.predictions);
			
		})

	function addPredictions(fixtures, predictions) {
		for (var i = 0; i < fixtures.length; i++) {
			fixtures[i].homeGoals = predictions[i].homeGoals;
			fixtures[i].awayGoals = predictions[i].awayGoals;
		};
	}

	self.calculate = function() {
		self.points = calculatePointsService.run(self);
	}

	// Make getResults a facotry/provider
	// call getResultsService
	// loop to get goals
	// add to (new) self.results
	// compare with self.fixtures

	function getResults() {
		getResultsService.requestResults()
			.then(function(data){
				var data = data.data;
				return data;
			}).then(function(data) {

			})
	}

	getResults();

}]);

// app.controller('inputtedPredictionsController', ['predictionObjectFactory', 'fixturesFactory', function(predictionObjectFactory, fixturesFactory) {
// 	var self = this;

// 	fixturesFactory.run
// 		.then(function(data) {
// 			self.prediction = predictionObjectFactory.run(self.fixtureAmount);
// 		})

// }]);







