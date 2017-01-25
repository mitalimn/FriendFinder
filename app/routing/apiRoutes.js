var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");

var friends = require("../data/friends.js");


module.exports = function(app){
	var match = [];

	app.get('/api/friends', function(req,res){
		res.json(friends);
	})

	app.post('/api/survey', function(req, res){
			friends.push(req.body);
			newUserScore = req.body.scores;
			
			console.log(newUserScore);

			for(var i=0; i< friends.length-1; ++i){
				var matchScore = 0;
				var scoreDiff = 0;

				for(var j=0; j< newUserScore.length; j++){
					scoreDiff = Math.abs(newUserScore[j] - friends[i].scores[j]);
					matchScore = matchScore + scoreDiff;
				}
				match.push(matchScore);
			}

			var perfectMatchScore = match[0];

			for(var i=1 ; i<match.length; ++i){
				if(match[i]<perfectMatchScore){
					perfectMatchScore = match[i];
				}
			}

			var ties = [];
			for(var i=0; i<match.length; ++i){
				if(perfectMatchScore == match[i]){
					ties.push(i);
				}
			}

			var max = ties.length -1;
			var min = 0;

			var chooseRandom = (Math.floor(Math.Random() * (max - min+1))+min);

			var index = ties[chooseRandom];

			var perfectMatchName = friends[index].name; 

			if(ties.length >1){
				var popupText = "Choose randomly among " + ties.length +"matches";
			}
			else{
				var popupText = "There are no ties";
			}

			var perfectMatchImageLink = friends[index].photo;

			res.json({
				'name' : perfectMatchName,
				'alert' : popupText,
				'photo' : perfectMatchImageLink
			});

		});
}