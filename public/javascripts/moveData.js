function moveModelToAnotherSpace(scope, drag, drop){
		   	
   scope.space[drop].player = scope.space[drag].player;
	scope.space[drop].army.index = scope.space[drag].army.index;
	scope.space[drop].army.allegiance = scope.space[drag].army.allegiance;
			
	setSpaceAsEmpty(scope, drag);
	console.log("MOVED");
}
	
function setSpaceAsEmpty(scope, id){	
	
	scope.space[id].name = 'empty';
	scope.space[id].player = '0';
	scope.space[id].army.index = -1;
	scope.space[id].army.allegiance = 'none';

}

function setArmyAsMoved(scope){
	
	if(attackerOrDefender==="attack"){
		console.log("TEST");	     	 	
		scope.attackerarmy[scope.space[drop_space_number].army.index].canMove = 0;  
		scope.attackerarmy[scope.space[drop_space_number].army.index].location = drop_space_number;   	
	}
	else{
		scope.defenderarmy[scope.space[drop_space_number].army.index].canMove = 0;  
		scope.defenderarmy[scope.space[drop_space_number].army.index].location = drop_space_number;       
	}
		
}

function setSpaceArmy(scope){

   if(attackerOrDefender==="attack"){
      scope.space[drop_space_number].player = 2;
      scope.space[drop_space_number].army.allegiance= "attacker";
      scope.attackerarmy[selectionSpot].name = "empty";
   }
   else if(attackerOrDefender==="defend"){
		scope.space[drop_space_number].player = 1;  
		scope.space[drop_space_number].army.allegiance= "defender";   	
		scope.defenderarmy[selectionSpot].name = "empty";
  	}
  
  	scope.space[drop_space_number].army.index= selectionSpot;   
	
}