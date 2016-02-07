var app = angular.module('app', []);

app.controller('homeController', [ function () {
	var self = this;

	self.title = 'Premier Predictions';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/

	// What a $$state is
	// http://stackoverflow.com/questions/30146045/how-to-access-json-object-state-value

}]);

app.controller('showFixturesController', ['displayFixtures', 'predictionObjectFactory', 'fixturesProvider', function (displayFixtures, predictionObjectFactory, fixturesProvider) {
	var self = this;
	// displayFixtures.createFixtures.then(function(data) {
	// 	self.fixtures = data;
	// 	self.fixtureAmount = self.fixtures.length;
	// 	self.prediction = predictionObjectFactory.run(self.fixtureAmount);
	// })

	fixturesProvider.run
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

}]);

app.controller('inputtedPredictionsController', ['predictionObjectFactory', 'fixturesProvider', function(predictionObjectFactory, fixturesProvider) {
	var self = this;

	fixturesProvider.run
		.then(function(data) {
			self.prediction = predictionObjectFactory.run(self.fixtureAmount);
		})

}]);

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

app.factory('displayFixtures', ['getFixtures', 'makeFixtures', function (getFixtures, makeFixtures) {

	return {
		createFixtures: getFixtures.requestFixtures()
			.then( function (result) {
				var data = result.data.data;
				return data;
			}).then( function(result) {
				array = makeFixtures.loopFixtures(result);
				return array;
			})
	} 

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
				fixture.index = [i];
				list.push(fixture);
			}
		};
		return list;
	}	

}]);


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

app.factory('fixturesProvider', ['displayFixtures', function(displayFixtures) {

	return {
		run: displayFixtures.createFixtures
			.then(function(data) {
				var newData = data;
				self.data = newData;
				return newData;
			})		
	}

}]);