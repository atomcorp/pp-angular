// App

var app = angular.module('app', []);

app.controller('homeController', [ function () {
	var self = this;

	self.title = 'Premier Predictions';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/

	// What a $$state is
	// http://stackoverflow.com/questions/30146045/how-to-access-json-object-state-value

}]);

app.controller('showFixturesController', ['predictionObjectFactory', 'fixturesFactory', 'calculatePointsService', 'resultsFactory', function (predictionObjectFactory, fixturesFactory, calculatePointsService, resultsFactory) {
	var self = this;

	fixturesFactory.run
		.then(function(data) {
			self.fixtures = data;
			self.fixtureAmount = self.fixtures.length;
			self.predictions = predictionObjectFactory.run(self.fixtureAmount);
			addPredictions(self.fixtures, self.predictions);
			
		})

	// todo: delete this	
	function addPredictions(fixtures, predictions) {
		for (var i = 0; i < fixtures.length; i++) {
			fixtures[i].homeGoals = predictions[i].homeGoals;
			fixtures[i].awayGoals = predictions[i].awayGoals;
		};
	}

	// todo: delete this
	self.calculate = function() {
		self.points = calculatePointsService.run(self);
	}

	// Make getResults a facotry/provider
	// call getResultsService
	// loop to get goals
	// add to (new) self.results
	// compare with self.fixtures

	function getResults() {
		resultsFactory.runResults
			.then(function(data){
				var data = data;
				return data;
			}).then(function(data) {
				console.log('getresults', data);
			})
	}

}]);








app.factory('displayFixtures', ['getFixtures', 'makeFixtures', function (getFixtures, makeFixtures) {

	return {
		createFixtures: getFixtures.requestFixtures()
			.then( function (result) {
				var data = result.data.data;
				return data;
			}).then( function (result) {
				array = makeFixtures.loopFixtures(result);
				return array;
			})
	} 

}]);


app.factory('fixturesFactory', ['displayFixtures', function(displayFixtures) {

	return {
		run: displayFixtures.createFixtures
			.then(function(data) {
				var newData = data;
				self.data = newData;
				return newData;
			})		
	}

}]);
// Fixtures Service

app.service('getFixtures', ['$http', '$q', function ($http, $q) {
	var self = this;

	self.requestFixtures = function() {
		return $http.get('/app/example-data/fixtures.json')
			.success(function(response) {
				return response;
			});
	}

	return self;

}]);

app.service('makeFixtures', [function() {

	this.loopFixtures = function(data) {
		list = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].gameweek === 1) {
				var fixture = {};
				fixture.homeTeam = data[i].home;
				fixture.awayTeam = data[i].away;
				fixture.date = data[i].date;
				fixture.matchId = data[i].id;
				list.push(fixture);
			}
		};
		return list;
	}	

}]);
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
// Tasks Service

app.factory('predictionObjectFactory', [function () {
	
	return {
		run: function(array) {
			var predictionArray = [];
			for (var i = 0; i < array; i++) {
				var prediction = {};
				prediction.homeGoals = 0;
				prediction.awayGoals = 0;
				prediction.index = i;
				predictionArray.push(prediction);
			};
			return predictionArray;
		}
	}
}]);

app.service('calculatePointsService', [function() {
	// get actual scores
	// get predictions
	// compare and rank 

	this.run = function(data) {
		var userPoints = 0;
		for (var i = 0; i < data.fixtureAmount; i++) {
			var homeScore = data.fixtures[i].homeGoals;
			var awayScore = data.fixtures[i].awayGoals;
			var homePrediction = data.predictions[i].homeGoals;
			var awayPrediction = data.predictions[i].awayGoals;
			if (homeScore === homePrediction && awayScore === awayPrediction) {
				userPoints += 3;
			} else if (calculateResult(homeScore, awayScore) === calculateResult(homePrediction, awayPrediction)) {
				userPoints += 1;
			} else {
				userPoints += 0;
			}
		};
		return userPoints;
	}

	function calculateResult(home, away) {
		if (home > away) {
			return 'homeWin';
		} else if (home < away) {
			return 'awayWin';
		} else if (home === away){
			return 'draw';
		} else {
			console.error('Error in calculateResult()');
		}
	}
}]);