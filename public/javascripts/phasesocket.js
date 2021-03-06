socket.on('getPlayerNumber', function(data){
	
 	console.log("Get Player Number: " + data);
 	
 	var scope = angular.element($("#board")).scope();
 	
	if(scope.playerNumber === -1){
		
		scope.$apply(function(){
   		scope.playerNumber = data;
 		});

	}   
	 	
   determineWhosMove();
	updateWhosMove();
});
 	
socket.on('getPhase', function(data){
 		
	var scope = angular.element($("#board")).scope();	    		
	topOrBottom = getTopOrBottom(data.turn);			    	
	    	
	scope.$apply(function(){	

		if(scope.phase==='Movement'){	
			refreshArmiesCanMove(); 		
		}	
		
		flipArrow();  
   	scope.phase = data.phase;	

		//This is so you can't drag creatures on to the board during the Setup phase
		if(scope.phase==='Setup'){
			$('.waitingImage').draggable({disabled:true});   	
   	}
   	else{	 		
	 		if(scope.playerNumber === 2){
	 			$('.attackWaitingImage').draggable("enable");  
	 		}
	 		else{
	 			$('.defendWaitingImage').draggable("enable");
	 		}
   	}
  		scope.turn = Math.floor((data.turn+1)/2);
   
	});
 			
 	determineWhosMove();
 	updateWhosMove();
 		
 	if(data.phase==='Movement'){
		removeDeadCreatures();
		setCanMove(topOrBottom);
		setStartingLocationAsLocation();				
	}
 		
 	if((data.phase==='Attack')||(data.phase==='Retaliation')){	    			
		highlightWhoCanAttack();	
		setCanMoveToNone();
	}
	
	if(data.phase==='Attack'){	
	
		if(getWhoCanAttackFilter(scope.attackerarmy, scope.defenderarmy).length===0){
			socket.emit('setPhase', { phase: "Movement" });	
		}
	
	}
		
 });
 		
 function setStartingLocationAsLocation(){
 		
 	var scope = angular.element($("#board")).scope();	
 	
 	for(var i=0; i<scope.attackerarmy.length; i++){

		scope.$apply(function(){		

			if(topOrBottom === "bottom"){
				scope.attackerarmy[i].startinglocation = scope.attackerarmy[i].location;
			}else{
				scope.defenderarmy[i].startinglocation = scope.defenderarmy[i].location;				
			}
			
		});	
			 			
 	}	
 	
 }
 		
function setCanMove(topOrBottomTurn){
 		
 	var scope = angular.element($("#board")).scope();
	
	for(var i=0; i<scope.attackerarmy.length; i++){

		scope.$apply(function(){		

			if(topOrBottomTurn === "bottom"){
				scope.attackerarmy[i].canMove = 1;
			}else{
				scope.defenderarmy[i].canMove = 1;				
			}
			
		});					
		
	}	
 		
}
 		
function setCanMoveToNone(){
 		
var scope = angular.element($("#board")).scope();

	for(var i=0; i<scope.attackerarmy.length; i++){

		scope.$apply(function(){		
			scope.attackerarmy[i].canMove = 0;
			scope.defenderarmy[i].canMove = 0;				
		});					
		
	}
 		
}
 		
 			
function determineWhosMove(){
	
	var scope = angular.element($("#board")).scope();

 	if((scope.playerNumber === 1)&&(topOrBottom==="top")&&(scope.phase!=="Retaliation")){
		whosMove = "Your Action";
 	}
 	else if((scope.playerNumber === 1)&&(topOrBottom==="bottom")&&(scope.phase==="Retaliation")){
		whosMove = "Your Action";
 	}
 	else if((scope.playerNumber === 2)&&(topOrBottom==="bottom")&&(scope.phase!=="Retaliation")){
		whosMove = "Your Action";   
   }
   else if((scope.playerNumber === 2) &&(topOrBottom==="top")&&(scope.phase==="Retaliation")){
  		whosMove = "Your Action";
 	}
 	else{
		whosMove = "Opponent's Action";    			
 	}	  
	
}

function updateWhosMove(){
	$('#whosmove').text(whosMove);	
}

function flipArrow(){
	
if(topOrBottom==="bottom"){
	CSS.rotate('arrow', 90);
}
else{
	CSS.rotate('arrow', 270);
	}

}

function refreshArmiesCanMove(){
			
	var scope = angular.element($("#board")).scope();					
				    			
 	if(topOrBottom==="bottom"){
 		for(var x in scope.attackerarmy){
			scope.attackerarmy[x].canMove=1;
		}
	}					
	if(topOrBottom==="top"){
		for(var x in scope.defenderarmy){
			scope.defenderarmy[x].canMove=1;	
		}		
	} 
	
}	
	
function getTopOrBottom(turn){
	return ((turn%2==0) ? "bottom" : "top");
}

function removeDeadCreatures(){

	console.log("Remove Dead Creatures");

	var scope = angular.element($("#board")).scope();	

	for(var canAttackID=0; canAttackID<27; canAttackID++){

		if(deadButCanRetaliate.indexOf(canAttackID)>=0){
	
			console.log("DEAD BUT CAN RETALIATE");

			scope.$apply(function(){		
			   scope.space[canAttackID].name='empty';
			   scope.space[canAttackID].blood=0;
			   scope.space[canAttackID].player='0';
			   var allegiance = scope.space[canAttackID].army.allegiance;
			   scope.space[canAttackID].army.allegiance='none';	 
			
			 	if(allegiance==='defender'){
   				scope.defenderarmy[scope.space[canAttackID].army.index].location = -1;
   				scope.defenderarmy[scope.space[canAttackID].army.index].startinglocation = -1;
   				scope.defenderarmy[scope.space[canAttackID].army.index].canMove = 0;
   			}
   			else if(allegiance==='attacker'){
   				scope.attackerarmy[scope.space[canAttackID].army.index].location = -1;
   				scope.attackerarmy[scope.space[canAttackID].army.index].startinglocation = -1;
   				scope.attackerarmy[scope.space[canAttackID].army.index].canMove = 0;
   			}		
		   	else{
					console.log("ERROR: allegiance wasn't defined");		   				
		   	}
		   	
		   	scope.space[canAttackID].army.index=-1;  
			});		
		
		}
		
	}	

}
