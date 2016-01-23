var app = angular.module('app', []);

app.controller('homeController', ['$http', '$q', 'getFixtures', function($http, $q, getFixtures) {
	var self = this;
	self.test = 'This Works';

	// http://haroldrv.com/2015/02/understanding-angularjs-q-service-and-promises/
	getFixtures.getResponse()
		.then( function(result) {
			self.fixtures = result.data.data[0];
			console.log(self.fixtures);
		});
	
}]);

app.service('getFixtures', ['$http', '$q', function ($http, $q) {
	var self = this;

	self.getResponse = function() {
		return $http.get('/app/example-data/fixtures.json')
			.then(function(response) {
				return response;
			});
		
	}
	
	return self;
}]);