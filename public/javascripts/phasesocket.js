      socket.on('getPlayerNumber', function(data){
      	
    	console.log("Get Player Number: " + data);
    	
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
			  	
			  topOrBottom = getTopOrBottom(data.turn);			    	
			    	
			  scope.$apply(function(){				
			    		
    			if(data.phase==='Movement'){
					    			
					refreshArmiesCanMove();  			
    			}
				
			flipArrow();  

         scope.phase = data.phase;	
         scope.turn = Math.floor((data.turn+1)/2);
    		})
    			
    		determineWhosMove();
	 		updateWhosMove();
	 		
	 		
	 		   if((data.phase==='Attack')||(data.phase==='Retaliation')){	    			
					highlightWhoCanAttack();	
					setCanMoveToNone();
				}
				if(data.phase==='Movement'){
					setCanMove(topOrBottom);
					setStartingLocationAsLocation();				
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
			$('#arrow').css('-webkit-transform', 'rotate(90deg)');
			$('#arrow').css('-moz-transform', 'rotate(90deg)');    
			$('#arrow').css('-ms-transform', 'rotate(90deg)');		
			$('#arrow').css('-o-transform', 'rotate(90deg)');	
			$('#arrow').css('transform', 'rotate(90deg)');
		}
		else{
			$('#arrow').css('-webkit-transform', 'rotate(270deg)');
			$('#arrow').css('-moz-transform', 'rotate(270deg)');    
			$('#arrow').css('-ms-transform', 'rotate(270deg)');		
			$('#arrow').css('-o-transform', 'rotate(270deg)');	
			$('#arrow').css('transform', 'rotate(270deg)');
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