var express = require('express');
var router = express.Router();
var creatures = {};
var space = [];

var initializeModel = function(){

creatures["gargoyle"] = {"name": "gargoyle", "skillPower": 4, "skillFactor": 3};
creatures["cylcops"] = {"name": "cyclops", "skillPower": 9, "skillFactor": 2};
creatures["gorgon"] = {"name": "gorgon", "skillPower": 6, "skillFactor": 3};
creatures["behemoth"] = {"name": "behemoth", "skillPower": 8, "skillFactor": 3};
creatures["serpent"] = {"name": "serpent", "skillPower": 18, "skillFactor": 2};

creatures["ogre"] = {"name": "ogre", "skillPower": 6, "skillFactor": 2};
creatures["troll"] = {"name": "troll", "skillPower": 8, "skillFactor": 2};
creatures["ranger"] = {"name": "ranger", "skillPower": 4, "skillFactor": 4};
creatures["centaur"] = {"name": "centaur", "skillPower": 3, "skillFactor": 4};
creatures["lion"] = {"name": "lion", "skillPower": 5, "skillFactor": 3};
creatures["warbear"] = {"name": "warbear", "skillPower": 6, "skillFactor": 3};
creatures["minotaur"] = {"name": "minotaur", "skillPower": 4, "skillFactor": 4};
creatures["unicorn"] = {"name": "unicorn", "skillPower": 6, "skillFactor": 4};
creatures["wyvern"] = {"name": "wyvern", "skillPower": 7, "skillFactor": 3};
creatures["griffon"] = {"name": "griffon", "skillPower": 5, "skillFactor": 4};
creatures["hydra"] = {"name": "hydra", "skillPower": 10, "skillFactor": 3};

creatures["dragon"] = {"name": "dragon", "skillPower": 9, "skillFactor": 3};
creatures["giant"] = {"name": "giant", "skillPower": 7, "skillFactor": 4};
creatures["colossus"] = {"name": "colossus", "skillPower": 10, "skillFactor": 4};
creatures["guardian"] = {"name": "guardian", "skillPower": 12, "skillFactor": 2};
creatures["warlock"] = {"name": "warlock", "skillPower": 5, "skillFactor": 4};


space[0] = {"id": 1, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0, "player": "0", "neighbors": [1, 3, 4]};
space[1] = {"id": 2, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0, "player": "0", "neighbors": [0, 2, 4, 5]};
space[2] = {"id": 3, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [1, 5, 6]};
space[3] = {"id": 4, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [0, 4, 7, 8]};
space[4] = {"id": 5, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [0, 1, 3, 5, 8, 9]};
space[5] = {"id": 6, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [1, 2, 4, 6, 9, 10]};
space[6] = {"id": 7, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [2, 5, 10, 11]};
space[7] = {"id": 8, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [3, 8, 12, 13]};
space[8] = {"id": 9, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [3, 4, 7, 9, 13, 14]};
space[9] = {"id": 10, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [4, 5, 8, 10, 14,  15]};
space[10] = {"id": 11, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [5, 6, 9, 11, 15, 16]};
space[11] = {"id": 12, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [6, 10, 16, 17]};
space[12] = {"id": 13, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [7, 13, 18]};
space[13] = {"id": 14, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [7, 8, 12, 14, 18, 19]};
space[14] = {"id": 15, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [8, 9, 13, 15, 19, 20]};
space[15] = {"id": 16, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [9, 10, 14, 16, 20, 21]};
space[16] = {"id": 17, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [10, 11, 15, 17, 21, 22]};
space[17] = {"id": 18, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [11, 16, 22]};
space[18] = {"id": 19, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [12, 13, 19, 23]};
space[19] = {"id": 20, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [13, 14, 18, 20, 23, 24]};
space[20] = {"id": 21, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [14, 15, 19, 21, 24, 25]};
space[21] = {"id": 22, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [15, 16, 20, 22, 25, 26]};
space[22] = {"id": 23, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [16, 17, 21, 26]};
space[23] = {"id": 24, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [18, 19, 24]};
space[24] = {"id": 25, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [19, 20, 23, 25]};
space[25] = {"id": 26, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [20, 21, 24, 26]};
space[26] = {"id": 27, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [21, 22, 25]};

};

var battle = function(){
	
	};

var attackTarget = function(data, attackerSpace, defenderSpace) {
	space = data;
	
 	var attacker = space[attackerSpace];
 	var defender = space[defenderSpace];

 	var attacker_skillpower = creatures[attacker.name].skillPower;
 	var attacker_skillfactor = creatures[attacker.name].skillFactor;
 	
 	var defender_skillpower = creatures[defender.name].skillPower;
 	var defender_skillfactor = creatures[defender.name].skillFactor;

	var bloodtotal = defender.blood;

	for(var i=0; i<attacker_skillpower; i++){

		var dieroll = Math.floor((Math.random() * 6) + 1);		
			console.log(dieroll);
		 if(dieroll>(defender_skillfactor - attacker_skillfactor)+3){
		 	
		 	bloodtotal++;
		 }
		
		} 	
		
	space[defenderSpace].blood = bloodtotal;
 	
 	return {data: space};
};

	var updateServerModel = function(data){
		space = data.data;
	}
	
	var getBoard = function(){
		return {data: space};
	}


//module.exports = router;
module.exports.initializeModel = initializeModel;
module.exports.battle = battle;
module.exports.updateServerModel = updateServerModel;
module.exports.attackTarget = attackTarget;
module.exports.getBoard = getBoard;

