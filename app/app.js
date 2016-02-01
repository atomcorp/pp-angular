var app = angular.module('app', []);

app.controller('homeController', ['$scope', '$http', '$q', '$timeout', 'getFixtures', 'displayFixtures', function ($scope, $http, $q, $timeout, getFixtures, displayFixtures) {
	var self = this;

	self.title = 'Premier Predictions';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/

	// What a $$state is
	// http://stackoverflow.com/questions/30146045/how-to-access-json-object-state-value

}]);

app.controller('showFixturesController', ['displayFixtures', function(displayFixtures) {
	var self = this;
	displayFixtures.createFixtures.then(function(data) {
		self.fixtures = data;
		console.log(data);
	})

}])

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