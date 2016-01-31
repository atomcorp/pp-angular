var app = angular.module('app', []);

app.controller('homeController', ['$scope', '$http', '$q', '$timeout', 'getFixtures', 'displayFixtures', function ($scope, $http, $q, $timeout, getFixtures, displayFixtures) {
	var self = this;

	self.test = 'This Works';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/

	var deferred = $q.defer();

	this.fixtures = function() {
		displayFixtures.createFixtures()
			.then( function (result) {
				console.log(displayFixtures.data);
				return result;
			});
	}

	console.log(displayFixtures.data);

}]);

app.service('getFixtures', ['$http', '$q', function ($http, $q) {
	var self = this;

	self.requestFixtures = function() {
		return $http.get('/app/example-data/fixtures.json')
			.then(function(response) {
				return response;
			});
	}

}]);

app.service('displayFixtures', ['getFixtures', function (getFixtures) {

	var self = this;

	self.createFixtures = function() {
		getFixtures.requestFixtures()
			.then( function (result) {
				var data = result.data.data;
				return data;
				console.log(result);

			}).then( function(result) {
				result = makeFixtures(data);
				console.log(result);
			}).then ( function(result) {
				self.data = result;
				return self.data;
			});
	}

	function makeFixtures(data) {
		list = [];
		for (var i = 0; i < data.length; i++) {
			var fixture = {};
			fixture.homeTeam = data[i].home;
			fixture.awayTeam = data[i].away;
			fixture.data = data[i].date;
			list.push(fixture);
		};
		return list;
	}	

}]);