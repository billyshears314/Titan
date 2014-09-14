function creaturesOnBoardController($scope) {

	 $scope.playerNumber = -1;
	 $scope.phase = "Movement";
	 $scope.turn = "1";

    $scope.space= [];
    $scope.attackwaiting = [];
    $scope.defendwaiting = [];
    $scope.attackerarmy = [];
    $scope.defenderarmy = [];

var space = $scope.space;

var attackwaiting = $scope.attackwaiting;
var defendwaiting = $scope.defendwaiting;

var attackerarmy = $scope.attackerarmy;
var defenderarmy = $scope.defenderarmy;
    
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
space[25] = {"id": 26,"army": {"allegiance": "none", "index": -1},  "name": "empty", "blood": 0,  "player": "0", "neighbors": [20, 21, 24, 26]};
space[26] = {"id": 27, "army": {"allegiance": "none", "index": -1}, "name": "empty", "blood": 0,  "player": "0", "neighbors": [21, 22, 25]};

attackwaiting[0] = {"name": "empty"};
attackwaiting[1] = {"name": "empty"};
attackwaiting[2] = {"name": "empty"};
attackwaiting[3] = {"name": "empty"};
attackwaiting[4] = {"name": "empty"};
attackwaiting[5] = {"name": "empty"};
attackwaiting[6] = {"name": "empty"};

defendwaiting[0] = {"name": "empty"};
defendwaiting[1] = {"name": "empty"};
defendwaiting[2] = {"name": "empty"};
defendwaiting[3] = {"name": "empty"};
defendwaiting[4] = {"name": "empty"};
defendwaiting[5] = {"name": "empty"};
defendwaiting[6] = {"name": "empty"};

attackerarmy[0] = {"startinglocation": "-1", "canMove": 1, "location": -1};
attackerarmy[1] = {"startinglocation": "-1", "canMove": 1, "location": -1};
attackerarmy[2] = {"startinglocation": "-1", "canMove": 1, "location": -1};
attackerarmy[3] = {"startinglocation": "-1", "canMove": 1, "location": -1};
attackerarmy[4] = {"startinglocation": "-1", "canMove": 1, "location": -1};
attackerarmy[5] = {"startinglocation": "-1", "canMove": 1, "location": -1};
attackerarmy[6] = {"startinglocation": "-1", "canMove": 1, "location": -1};

defenderarmy[0] = {"startinglocation": "-1", "canMove": 1, "location": -1};
defenderarmy[1] = {"startinglocation": "-1", "canMove": 1, "location": -1};
defenderarmy[2] = {"startinglocation": "-1", "canMove": 1, "location": -1};
defenderarmy[3] = {"startinglocation": "-1", "canMove": 1, "location": -1};
defenderarmy[4] = {"startinglocation": "-1", "canMove": 1, "location": -1};
defenderarmy[5] = {"startinglocation": "-1", "canMove": 1, "location": -1};
defenderarmy[6] = {"startinglocation": "-1", "canMove": 1, "location": -1};



$scope.updateModel = function(updatedBoard){

	$scope.space = updatedBoard;
	$scope.$apply(function(){
		for(var i=0; i<27; i++){	
			if($scope.space[i].name!='empty'){	
					console.log($scope.space[i].name);	
					$('#creature'+i).show();
			}
		}
	});
	
	};
	
$scope.updateWaitingArmies = function(data){
	
	$scope.attackwaiting = data.attackwaiting;
	$scope.defendwaiting = data.defendwaiting;
		$scope.$apply(function(){
		for(var i=0; i<7; i++){	
			if($scope.attackwaiting[i].name!='empty'){	
					$('#attackWaitingImage'+i).show();
			}
			if($scope.defendwaiting[i].name!='empty'){	
					$('#defendWaitingImage'+i).show();
			$('#defendWaitingImage'+i).css('-webkit-transform', 'rotate(180deg)');
			$('#defendWaitingImage'+i).css('-moz-transform', 'rotate(180deg)');    
			$('#defendWaitingImage'+i).css('-ms-transform', 'rotate(180deg)');		
			$('#defendWaitingImage'+i).css('-o-transform', 'rotate(180deg)');	
			$('#defendWaitingImage'+i).css('transform', 'rotate(180deg)');
			}
		}
	});
	
	};
	
	
	//Used to deal with flipping the creatures
	$scope.$watch('space', function(newVal, oldVal){
 
	console.log('WATCHES FOR CHANGE IN SPACE'); 
 
    for(var i=0; i<27; i++){
    	
 
    	
    	if(newVal[i].player=="1"){
    		
			$('#creature'+i).css('-webkit-transform', 'rotate(180deg)');
			$('#creature'+i).css('-moz-transform', 'rotate(180deg)');    
			$('#creature'+i).css('-ms-transform', 'rotate(180deg)');		
			$('#creature'+i).css('-o-transform', 'rotate(180deg)');	
			$('#creature'+i).css('transform', 'rotate(180deg)');
    		console.log("Image Flipped: " + i);
    		
    	}
    	else{
    		//Must be a more efficient way than unflipping everything back all the time
    		$('#creature'+i).css('-webkit-transform', 'rotate(0deg)');
			$('#creature'+i).css('-moz-transform', 'rotate(0deg)');    
			$('#creature'+i).css('-ms-transform', 'rotate(0deg)');		
			$('#creature'+i).css('-o-transform', 'rotate(0deg)');	
			$('#creature'+i).css('transform', 'rotate(0deg)');
    		}
    	
		console.log(JSON.stringify(space));    	
    	
    	if(newVal[i].name!='empty'){
    		
			console.log('Before');
			console.log('Blood: ' + newVal[i].blood);
			console.log('Skill Power: ' + creatures[newVal[i].name].skillPower);
    		
		   	if(newVal[i].blood>=creatures[newVal[i].name].skillPower){	   	
		   			console.log("DEAD");	
		   			space[i].name='empty';
		   			space[i].blood=0;
		   			space[i].player='0';
		   			space[i].army.allegiance='none';
		   			space[i].index=-1;
		   		}  		
    		
    		$('#creature'+i).show();
			$('#blood'+i).show();   	
			if(newVal[i].player=="1"){
				$('#blood'+i).css('left', 60);
				$('#blood'+i).css('top', 50);				
				}	
    		}
    	else{
    		$('#creature'+i).hide();
   		$('#blood'+i).hide();			
    		 }	
    	
    	}
    
}, true);


	$scope.$watch('attackerarmy', function(newVal, oldVal){
 
    for(var i=0; i<7; i++){
    	
		if($scope.playerNumber===1){
			$('#creature'+newVal[i].location).draggable("disable");   
			
			}   
			else{ 	
    	
    	
    	if(newVal[i].canMove===0){
			$('#creature'+newVal[i].location).draggable("disable");    		
    		}
    	else{
    		$('#creature'+newVal[i].location).draggable("enable"); 
    		}
    	
    	}
    	
    }
    
}, true);


	$scope.$watch('defenderarmy', function(newVal, oldVal){
 
    for(var i=0; i<7; i++){
    	
		if($scope.playerNumber===2){
			$('#creature'+newVal[i].location).draggable("disable");   
			
			}   
			else{ 	
    	
    	
    	if(newVal[i].canMove===0){
		$('#creature'+newVal[i].location).draggable("disable");    		
    		}
    	else{
    		$('#creature'+newVal[i].location).draggable("enable"); 
    		}
    	
    	}
    	
    }
    
}, true);

 
}

var creatures = [];

creatures[0] = {"name": "gargoyle", "skillPower": 4, "skillFactor": 3};
creatures[1] = {"name": "cyclops", "skillPower": 9, "skillFactor": 2};
creatures[2] = {"name": "gorgon", "skillPower": 6, "skillFactor": 3};
creatures[3] = {"name": "behemoth", "skillPower": 8, "skillFactor": 3};
creatures[4] = {"name": "serpent", "skillPower": 18, "skillFactor": 2};

creatures[5] = {"name": "ogre", "skillPower": 6, "skillFactor": 2};
creatures[6] = {"name": "troll", "skillPower": 8, "skillFactor": 2};
creatures[7] = {"name": "ranger", "skillPower": 4, "skillFactor": 4};
creatures[8] = {"name": "centaur", "skillPower": 3, "skillFactor": 4};
creatures[9] = {"name": "lion", "skillPower": 5, "skillFactor": 3};
creatures[10] = {"name": "warbear", "skillPower": 6, "skillFactor": 3};
creatures[11] = {"name": "minotaur", "skillPower": 4, "skillFactor": 4};
creatures[12] = {"name": "unicorn", "skillPower": 6, "skillFactor": 4};
creatures[13] = {"name": "wyvern", "skillPower": 7, "skillFactor": 3};
creatures[14] = {"name": "griffon", "skillPower": 5, "skillFactor": 4};
creatures[15] = {"name": "hydra", "skillPower": 10, "skillFactor": 3};

creatures[16] = {"name": "dragon", "skillPower": 9, "skillFactor": 3};
creatures[17] = {"name": "giant", "skillPower": 7, "skillFactor": 4};
creatures[18] = {"name": "colossus", "skillPower": 10, "skillFactor": 4};
creatures[19] = {"name": "guardian", "skillPower": 12, "skillFactor": 2};
creatures[20] = {"name": "warlock", "skillPower": 5, "skillFactor": 4};