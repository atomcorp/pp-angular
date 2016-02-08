
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