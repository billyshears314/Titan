function creaturesOnBoardController($scope) {

	 $scope.playerNumber = -1;
	 $scope.phase = "Movement";
	 $scope.turn = "1";

    $scope.space= [];
    $scope.attackerarmy = [];
    $scope.defenderarmy = [];

var space = $scope.space;

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


attackerarmy[0] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
attackerarmy[1] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
attackerarmy[2] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
attackerarmy[3] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
attackerarmy[4] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
attackerarmy[5] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
attackerarmy[6] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};

defenderarmy[0] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
defenderarmy[1] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
defenderarmy[2] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
defenderarmy[3] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
defenderarmy[4] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
defenderarmy[5] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};
defenderarmy[6] = {"name": "empty", "startinglocation": -1, "canMove": 1, "location": -1};



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
	
	$scope.attackerarmy = data.attackerarmy;
	$scope.defenderarmy = data.defenderarmy;
		$scope.$apply(function(){
		for(var i=0; i<7; i++){	
		console.log("OKAY");
			if($scope.attackerarmy[i].name!='empty'){	
					$('#attackWaitingImage'+i).show();
			}
			if($scope.defenderarmy[i].name!='empty'){	
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
    	
		//console.log(JSON.stringify(space));    	
    	
    	if(newVal[i].name!='empty'){
    		
		//	console.log('Before');
		//	console.log('Blood: ' + newVal[i].blood);
		//	console.log('Skill Power: ' + creatures[newVal[i].name].skillPower);
    		
    			/*TODO: Also must check if creature has retaliated yet, should be another field*/
		   	if(newVal[i].blood>=creatures[newVal[i].name].skillPower){	   	
		   			console.log("DEAD");	
		   			console.log("I: " + i);
		   			$scope.space[i].name='empty';
		   			$scope.space[i].blood=0;
		   			$scope.space[i].player='0';
		   			var allegiance = $scope.space[i].army.allegiance;
		   			$scope.space[i].army.allegiance='none';
		   		
		   			
		   			if(allegiance==='defender'){
		   				$scope.defenderarmy[$scope.space[i].army.index].location = -1;
		   				$scope.defenderarmy[$scope.space[i].army.index].startinglocation = -1;
		   				$scope.defenderarmy[$scope.space[i].army.index].canMove = 0;
		   			}
		   			else if(allegiance==='attacker'){
		   				$scope.attackerarmy[$scope.space[i].army.index].location = -1;
		   				$scope.attackerarmy[$scope.space[i].army.index].startinglocation = -1;
		   				$scope.attackerarmy[$scope.space[i].army.index].canMove = 0;
		   			}
		   			
		   			else {
							console.log("ERROR: allegiance wasn't defined");		   				
		   				}
		   				$scope.space[i].army.index=-1;	
		   		}  		
    				else{
    				$('#creature'+i).show();
					$('#blood'+i).show();   	
					}
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
		//	$('#creature'+newVal[i].location).draggable("disable");   
			
			}   
			else{ 	
    	
    	
    	if(newVal[i].canMove===0){
		//	$('#creature'+newVal[i].location).draggable("disable");    		
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
