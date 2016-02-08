
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