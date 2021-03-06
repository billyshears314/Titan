 var topOrBottom = "top";
 var whosmove = "";

 var creaturesThatCanAttack;
 var totalTargetCreatures = [];
 var targetsSelected = [];
 var canAttackID;

 
 socket.on('getBoardModel', function(data){
 	var scope = angular.element($("#board")).scope();
   scope.updateModel(data.data);
});
 
 socket.on('getWaitingArmies', function(data){
	var scope = angular.element($("#board")).scope();
	console.log(JSON.stringify(data));
	scope.updateWaitingArmies(data);    	
});
 		
socket.on('getConcede', function(data){
	alert("Your opponent has resigned");
});
 	
$('#confirm_button').click(function(){
 		
 	var scope = angular.element($("#board")).scope();
 		
//	if(whosMove === "Your Action"){    		
 		
 	if(scope.phase==='Retaliation'){

		//Move this to end of retaliation phase later
		var hasNoCreaturesLeft =scope.hasNoCreaturesLeft();	
		console.log("CREATURES LEFT: " + hasNoCreaturesLeft);
		if(hasNoCreaturesLeft!=='nobody'){
			alert(hasNoCreaturesLeft);
		}	

	}
		
	if(scope.phase==='Setup'){
				
		//Hide buttons to add creatures after setup phase
		for(var i=0; i<7; i++){

			$('#defenderStartingSpot'+i).hide();
			$('#attackerStartingSpot'+i).hide();
		}		
		
	}

	socket.emit('confirm', {});	
						
	//		}
	
});

function highlightWhoCanAttack(){

	console.log("HIGHLIGHT WHO CAN ATTACK");

	var scope = angular.element($("#board")).scope();		
	var turn = isAttackerOrDefenderTurn(scope);		
	var canAttack = [];
	
	 if(turn==="attacker"){
	  	canAttack = getWhoCanAttackFilter(scope.attackerarmy, scope.defenderarmy);
		}
	 else if(turn==="defender"){
		canAttack = getWhoCanAttackFilter(scope.defenderarmy, scope.attackerarmy);
		}
		
		creaturesThatCanAttack = canAttack;
		console.log("Creatures that can attack: " + JSON.stringify(creaturesThatCanAttack));
		
		CSS.outlineWhichCanAttack(creaturesThatCanAttack);
	
}

//Remove army creatures which don't exist (i.e. location=-1)		
function getWhoCanAttackFilter(attacker, defender){
	
	var newAttacker = [];
	var newDefender = [];
	
	for(var i=0; i<attacker.length; i++){
		if(attacker[i].location!==-1){
			newAttacker.push(attacker[i].location);		
		}
	}
	for(var i=0; i<defender.length; i++){
		if(defender[i].location!==-1){
			newDefender.push(defender[i].location);				
		}
	}
		
	console.log("ATTACK: " + newAttacker);
	console.log("DEFEND: " + newDefender);
	
	return getWhoCanAttack(newAttacker, newDefender)
	
}
	
//Get an array of friendly creatures that are next to one or more opponents
function getWhoCanAttack(attacker, defender){

	var scope = angular.element($("#board")).scope();		
	canAttack = [];
	
	var isNextTo = false;
	
	for(var i=0; i<attacker.length; i++){

		for(var j=0; j<defender.length; j++){
			if(scope.space[attacker[i]].neighbors.indexOf(defender[j])>=0){
				totalTargetCreatures.push(defender[j]);
				isNextTo = true;
				}				
			}			
			if(isNextTo===true){
				canAttack.push(attacker[i]);
			}
			isNextTo = false;
		}
		return canAttack;
	}
	
	$('#concede_button').click(function(){
	socket.emit('concede', {});
});
	
//Select Creature on Board
$(".creatureOnTarget").click(function(){

 	var id = $(this).attr('id');	
 	id = parseInt(id.substring(8));
	var isTarget = false;	
	var scope = angular.element($("#board")).scope();	

	console.log("ID: " + id);

	//Case: Select Friendly Creature
	if(creaturesThatCanAttack.indexOf(id)>=0){
		canAttackID = id;

		$(this).css('border-width', '4px');
		
		console.log(JSON.stringify("Creatures that can attack: " + creaturesThatCanAttack));
	
		for(var i=0; i<scope.space[id].neighbors.length; i++){
	
			for(var j=0; j<totalTargetCreatures.length; j++){
	
				if(scope.space[id].neighbors[i]==totalTargetCreatures[j]){
					isTarget = true;
					targetsSelected.push(scope.space[id].neighbors[i]);
				}
							
			}	
			
			if(isTarget===true){
				CSS.outlineTarget(scope, id, i);			
			}	
		
		}
	
	}//Case: Select Target Creature
	else if(targetsSelected.indexOf(id)>=0){
		socket.emit('battle', {data: scope.space, 'attackerID': canAttackID, 'defenderID': id});
		CSS.defaultOutline('creature'+id);
		CSS.defaultOutline('creature'+canAttackID);

	var index = targetsSelected.indexOf(id);	
		targetsSelected.splice(index, 1);	
		
	}
	console.log("Creatures that can attack: " + JSON.stringify(creaturesThatCanAttack));
	console.log("TARGETS SELECTED: " + JSON.stringify(targetsSelected));

});

function isAttackerOrDefenderTurn(scope){
	
	var turn = "nobody";		
	
	if((topOrBottom==="top")&&(scope.phase==="Attack")){
		turn = "defender";				
		}
	if((topOrBottom==="top")&&(scope.phase==="Retaliation")){
		turn = "attacker";			
		}
	if((topOrBottom==="bottom")&&(scope.phase==="Retaliation")){
		turn = "defender";			
		}
	if((topOrBottom==="bottom")&&(scope.phase==="Attack")){
		turn = "attacker";			
		}
	
	return turn;			
	
}


