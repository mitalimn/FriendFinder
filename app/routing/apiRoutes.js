var friendsData = require("../data/friends.js");

module.exports = function(app){
	app.get('/api/friends', function(req,res){
	res.json(friendsData);
});

// post route to add friends friendsData

app.post('/api/friends', function(req, res){
	var newFriend = {
		name : req.body.name,
		photo  : req.body.photo,
		scores : []
	};

	var scoresArray = [];
	for (var i=0; i<req.body.scores.length; i++){
		scoresArray.push(parseInt(req.body.scores[i]))
	}
	newFriend.scores = scoresArray;

	var scoreComparisonArray = [];

	for(var i=0; i<friendsData.length;i++){
		var currentComparison = 0;
		for(var j = 0; j<newFriend.scores.length;j++){
			currentComparison += Math.abs(newFriend.scores[j] - friendsData[i].scores[j]);
		} 
		scoreComparisonArray.push(currentComparison);
	}

//determine best match

	var bestMatchPosition = 0;
	for(var i = 1; i< scoreComparisonArray.length; i++){
		if(scoreComparisonArray[i] <= scoreComparisonArray[bestMatchPosition]){
			bestMatchPosition = i;
		}
	}

	//if they have same scores , new entry is chosen

	var bestFriendMatch = friendsData[bestMatchPosition];
	res.json(bestFriendMatch);
	friendsData.push(newFriend);

});//end post

}//end exports app function





