var app = angular.module('app', []);

app.controller('homeController', ['$scope', '$http', '$q', '$timeout', 'getFixtures', 'displayFixtures', function ($scope, $http, $q, $timeout, getFixtures, displayFixtures) {
	var self = this;

	self.test = 'This Works';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/

	displayFixtures.createFixtures();

	self.fixtures = displayFixtures;

	console.log(typeof displayFixtures.createFixtures())

}]);

app.service('displayFixtures', ['getFixtures', function (getFixtures) {

	var self = this;

	self.createFixtures = function() {
		getFixtures.requestFixtures()
			.then( function (result) {
				var data = result.data.data;
				return data;
			}).then( function(result) {
				result = makeFixtures(result);
				return result;
			}).then ( function(result) {
				self.results = result;
				return result;
			});
	}

	function makeFixtures(data) {
		list = [];
		for (var i = 0; i < data.length; i++) {
			var fixture = {};
			fixture.homeTeam = data[i].home;
			fixture.awayTeam = data[i].away;
			fixture.fate = data[i].date;
			list.push(fixture);
		};
		return list;
	}	

	self.testThis = function () {
		return 'This text';
	}

	return self;

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