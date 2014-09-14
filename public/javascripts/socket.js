window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:8080');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
	 var topOrBottom = "top";
	 var whosmove = "";
	 
	 var creaturesThatCanAttack;
	 var totalTargetCreatures = [];
	 var targetsSelected = [];
	 var canAttackID;
		 	
		   $('#arrow').css('-webkit-transform', 'rotate(270deg)');
			$('#arrow').css('-moz-transform', 'rotate(270deg)');    
			$('#arrow').css('-ms-transform', 'rotate(270deg)');		
			$('#arrow').css('-o-transform', 'rotate(270deg)');	
			$('#arrow').css('transform', 'rotate(270deg)');
 
    socket.on('message', function (data) {
        if(data.message) {

	    messages.push('<b>Player ' +data.player +':  </b>' + data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;

        } else {
            console.log("There is a problem:", data);
        }
    });
    
    socket.on('initializeBoard', function(data){

    	});
    
   sendButton.onclick = function() {
   	var text = field.value;
   	var scope = angular.element($("#board")).scope();
      socket.emit('send', { message: text, player: scope.playerNumber });
	   $('#field').val('');
    };
    
       $("input").keyup(function(e) {
		 e.preventDefault();
       if(e.keyCode == 13) {
	    var text = field.value;
	    var scope = angular.element($("#board")).scope();
       socket.emit('send', {message: text, player: scope.playerNumber });
	    $('#field').val('');
        }
    });
    
    socket.on('getBoardModel', function(data){
    	var scope = angular.element($("#board")).scope();
      scope.updateModel(data.data);
    });
    
    socket.on('getWaitingArmies', function(data){
		var scope = angular.element($("#board")).scope();
		scope.updateWaitingArmies(data.data);    	
    	});
    
    socket.on('getPlayerNumber', function(data){
    	var scope = angular.element($("#board")).scope();
		if(scope.playerNumber === -1){
				scope.$apply(function(){
         	scope.playerNumber = data;
    			})
			}    	
	        determineWhosMove();
	 		 updateWhosMove();
    	});
    	
    	socket.on('getPhase', function(data){
    	var scope = angular.element($("#board")).scope();
			  scope.$apply(function(){
			  	if(data.turn%2==0){
			 topOrBottom = "bottom";
			$('#arrow').css('-webkit-transform', 'rotate(90deg)');
			$('#arrow').css('-moz-transform', 'rotate(90deg)');    
			$('#arrow').css('-ms-transform', 'rotate(90deg)');		
			$('#arrow').css('-o-transform', 'rotate(90deg)');	
			$('#arrow').css('transform', 'rotate(90deg)');
		}
		else{
			topOrBottom = "top";
			$('#arrow').css('-webkit-transform', 'rotate(270deg)');
			$('#arrow').css('-moz-transform', 'rotate(270deg)');    
			$('#arrow').css('-ms-transform', 'rotate(270deg)');		
			$('#arrow').css('-o-transform', 'rotate(270deg)');	
			$('#arrow').css('transform', 'rotate(270deg)');
			scope.turn = (data.turn+1)/2;
			}

         	scope.phase = data.phase;	
    			})
    			
    		determineWhosMove();
	 		updateWhosMove();
    		highlightWhoCanAttack();
    		});
    		
    	socket.on('getConcede', function(data){
    		alert("Your opponent has resigned");
    		
    		});
    	
    	$('#confirm_button').click(function(){

			if(whosMove === "Your Action"){
				socket.emit('confirm', {});				
				}

		});
		
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
			
			var scope = angular.element($("#board")).scope();
						
			 scope.$apply(function(){
			 	
			for(var i=0; i<7; i++){

				scope.attackerarmy[i].canMove = 1;				
				
				}					
			
		});
		
	}
	
	function highlightWhoCanAttack(){

		console.log("HIGHLIGHT WHO CAN ATTACK");

		var turn = "nobody";		
		
		var scope = angular.element($("#board")).scope();		
		
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
			
		
		var canAttack = [];
		
		 if(turn==="attacker"){
			
		  canAttack = getWhoCanAttackFilter(scope.attackerarmy, scope.defenderarmy);
			
			
			}
		 else if(turn==="defender"){
			
			canAttack = getWhoCanAttackFilter(scope.defenderarmy, scope.attackerarmy);
			
			}
			
			creaturesThatCanAttack = canAttack;
			
			console.log("I WONDER: " + JSON.stringify(creaturesThatCanAttack));
			
			for(var i=0; i<canAttack.length; i++){

				$('#creature'+canAttack[i]).css('border-style', 'solid');
				$('#creature'+canAttack[i]).css('border-width', '2px');
				$('#creature'+canAttack[i]).css('color', '#00FF00');
				
			}
			
		
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
		
		$(".creatureOnTarget").click(function(){

 	var id = $(this).attr('id');	
 	id = parseInt(id.substring(8));
	var isTarget = false;	
	var scope = angular.element($("#board")).scope();	
	
	console.log("ID: " + id);

	
	if(creaturesThatCanAttack.indexOf(id)>=0){
		canAttackID = id;
		$(this).css('border-width', '4px');
	
		
		console.log(JSON.stringify(creaturesThatCanAttack));
	
	for(var i=0; i<scope.space[id].neighbors.length; i++){

		for(var j=0; j<totalTargetCreatures.length; j++){

			if(scope.space[id].neighbors[i]==totalTargetCreatures[j]){
				isTarget = true;
				targetsSelected.push(scope.space[id].neighbors[i]);
			}
							
		}	
			
		if(isTarget===true){
			$('#creature'+scope.space[id].neighbors[i]).css('border-style', 'solid');	
			$('#creature'+scope.space[id].neighbors[i]).css('border-width', '2px');		
			$('#creature'+scope.space[id].neighbors[i]).css('color', '#FF0000');		
						
			}	
		
		}
		
	}
	else if(targetsSelected.indexOf(id)>=0){
		console.log("ATTACKKK!!!");
		console.log('attackerID: ' + canAttackID);
		console.log('defenderID: ' + id);
	//	socket.emit('updateBoard', {data: scope.space});
		socket.emit('battle', {data: scope.space, 'attackerID': canAttackID, 'defenderID': id});
		$('#creature'+id).css('border-width', '0px');
		$('#creature'+canAttackID).css('border-width', '0px');
		}
		console.log("TARGETS SELECTED: " + JSON.stringify(targetsSelected));
	
});

}


