//Determines where the creature can move
function explore(space, movement, hasMovedOne){
		
	var scope = angular.element($("#board")).scope();

	if(!((scope.space[space].player!=="0")&&(hasMovedOne===true))){
		
		var notThere = true;
		
		//return space;
		for(var i=0; i<totalSpaces.length; i++){
				
			if(totalSpaces[i] == space){
				notThere = false;
				break;					
			}		
		}
		if(notThere){	
			totalSpaces.push(space);		
		}
	
		if(movement!=0){
		
			for(var i=0; i<scope.space[space].neighbors.length; i++){
				explore(scope.space[space].neighbors[i], movement - 1, true);		
			}	
			
		}
		
	}
	
	return totalSpaces;	
}
	
	function getAvailableSpaces(scope){

		if(attackerOrDefender==="defend"){
				var availableSpaces = explore(0, creatures[scope.defenderarmy[selectionSpot].name].skillFactor-1, false);
				availableSpaces = explore(1, creatures[scope.defenderarmy[selectionSpot].name].skillFactor-1, false);
				availableSpaces = explore(2, creatures[scope.defenderarmy[selectionSpot].name].skillFactor-1, false);
		}
		else{
				var availableSpaces = explore(23, creatures[scope.attackerarmy[selectionSpot].name].skillFactor-1, false);
				availableSpaces = explore(24, creatures[scope.attackerarmy[selectionSpot].name].skillFactor-1, false);
				availableSpaces = explore(25, creatures[scope.attackerarmy[selectionSpot].name].skillFactor-1, false);
				availableSpaces = explore(26, creatures[scope.attackerarmy[selectionSpot].name].skillFactor-1, false);	
			}		

		return availableSpaces;	
	
	}
	
	
$('#reset').click(function(){
	
	var scope = angular.element($("#board")).scope();
	
	if(topOrBottom==="bottom"){
		
		for(var i=0; i<scope.attackerarmy.length; i++){

			if(scope.attackerarmy[i].location!==-1){

				if(scope.attackerarmy[i].startinglocation===-1){
					scope.$apply(function(){
		
						var index = scope.space[scope.attackerarmy[i].location].army.index;							
						scope.attackerarmy[index].name = scope.space[scope.attackerarmy[i].location].name;
						$('#attackWaitingImage' + index).show();
						setSpaceAsEmpty(scope, scope.attackerarmy[i].location);
					});
					}
				else{				
					scope.$apply(function(){	
						copyOver(scope, scope.attackerarmy[i].location, scope.attackerarmy[i].startinglocation);
					});
							
				//	scope.attackerarmy[scope.space[scope.attackerarmy[i].startinglocation].army.index].location = scope.attackerarmy[i].startinglocation;
				}
				
			}
			//Reset attacker army values
				scope.$apply(function(){
					scope.attackerarmy[i].location = scope.attackerarmy[i].startinglocation;
					scope.attackerarmy[i].canMove = 1;
				});
				
			}		
		
	}
	else{
		
		for(var i=0; i<scope.defenderarmy.length; i++){

			if(scope.defenderarmy[i].location!==-1){

				if(scope.defenderarmy[i].startinglocation===-1){
					scope.$apply(function(){
		
						var index = scope.space[scope.defenderarmy[i].location].army.index;							
						scope.defenderarmy[index].name = scope.space[scope.defenderarmy[i].location].name;
						$('#defendWaitingImage' + index).show();
						setSpaceAsEmpty(scope, scope.defenderarmy[i].location);
					});
					}
				else{				
					scope.$apply(function(){	
						copyOver(scope, scope.defenderarmy[i].location, scope.defenderarmy[i].startinglocation);
					});
							
				//scope.defenderarmy[scope.space[scope.defenderarmy[i].startinglocation].army.index].location = scope.defenderarmy[i].startinglocation;
				}
				
			}
				//Reset defender army values;
				scope.$apply(function(){
					scope.defenderarmy[i].location = scope.defenderarmy[i].startinglocation;
					scope.defenderarmy[i].canMove = 1;
				});
			
				
			}	
			
		}
		
		
	var socket = io.connect('http://localhost:8080'); 
    socket.emit('updateBoard', {data: scope.space});   
	
	});
	
$('#undo').click(function(){
	
		var i = moveOrder.pop();
	
		var scope = angular.element($("#board")).scope();
	
	if(topOrBottom==="bottom"){
		
			if(scope.attackerarmy[i].location!==-1){

				if(scope.attackerarmy[i].startinglocation===-1){
					scope.$apply(function(){
		
						var index = scope.space[scope.attackerarmy[i].location].army.index;							
						scope.attackerarmy[index].name = scope.space[scope.attackerarmy[i].location].name;
						$('#attackWaitingImage' + index).show();
						setSpaceAsEmpty(scope, scope.attackerarmy[i].location);
					});
					}
				else{				
					scope.$apply(function(){	
						copyOver(scope, scope.attackerarmy[i].location, scope.attackerarmy[i].startinglocation);
					});
					
				}
				scope.$apply(function(){
					scope.attackerarmy[i].location = scope.attackerarmy[i].startinglocation;
					scope.attackerarmy[i].canMove = 1;
				});
			}					
		
	}
	else{

			if(scope.defenderarmy[i].location!==-1){

				if(scope.defenderarmy[i].startinglocation===-1){
					scope.$apply(function(){
		
						var index = scope.space[scope.defenderarmy[i].location].army.index;							
						scope.defenderarmy[index].name = scope.space[scope.defenderarmy[i].location].name;
						$('#defendWaitingImage' + index).show();
						setSpaceAsEmpty(scope, scope.defenderarmy[i].location);
					});
					}
				else{				
					scope.$apply(function(){	
						copyOver(scope, scope.defenderarmy[i].location, scope.defenderarmy[i].startinglocation);
					});
							
				}
				scope.$apply(function(){
					scope.defenderarmy[i].location = scope.defenderarmy[i].startinglocation;
					scope.defenderarmy[i].canMove = 1;
				});
				
			}
			
		}
		
		
	var socket = io.connect('http://localhost:8080'); 
   socket.emit('updateBoard', {data: scope.space});  
	
});
	
	