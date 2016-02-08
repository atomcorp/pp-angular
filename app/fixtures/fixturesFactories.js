
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