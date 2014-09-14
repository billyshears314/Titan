var space_number = -1;
var drop_space_number = -1;
var drag_space_number = -1;

var selectionSpot = -1;
var attackerOrDefender;

 $( ".waitingImage" ).draggable({
 helper: "clone",
 revert: "invalid",
 
 start: function(event, ui){

		selectionSpot = $(this).attr('id');
		attackerOrDefender = selectionSpot.substring(0,6);
		selectionSpot = selectionSpot.substring(18);
		drag_space_number = selectionSpot;

		var scope = angular.element($("#board")).scope();

		var availableSpaces = getAvailableSpaces(scope);

		
		highlightAvailableMoves(availableSpaces)		

		totalSpaces = [];
	},
	stop: function( event, ui ) {
		
		unhighlightSpaces();
		
		var scope = angular.element($("#board")).scope();


	scope.$apply(function(){		  	
		  	
		setSpaceArmy(scope)		  		  	
		  	
		setArmyAsMoved(scope);     	
     	
       var socket = io.connect('http://localhost:8080'); 
    	  socket.emit('updateBoard', {data: scope.space});
    	   socket.emit('updateWaitingArmies', {data: {"attackwaiting": scope.attackwaiting, "defendwaiting": scope.defendwaiting}});
     });
     
	}
 });
 
 $(".creatureOnTarget").draggable({
 helper: "clone",
revert: "invalid",

start: function(event, ui){

		var id2 = $(this).parent().parent().attr('id');
		var space_number2 = parseInt(id2.substring(2));
		drag_space_number = space_number2;
	
		var scope = angular.element($("#board")).scope();
		
		var availableSpaces = explore(space_number2, creatures[scope.space[space_number2].name].skillFactor);
		
		highlightAvailableSpaces(availableSpaces);
		
		totalSpaces = [];
	},

stop: function( event, ui ) {
		
		unhighlightSpaces();

		var id2 = $(this).parent().parent().attr('id');
		var space_number2 = parseInt(id2.substring(2)); 	
		
		var scope = angular.element($("#board")).scope();	
		
		  scope.$apply(function(){
		  scope.space[space_number2].name = 'empty';
        scope.space[drop_space_number].player = scope.space[drag_space_number].player;
        scope.space[drag_space_number].player = 0;

			scope.space[drop_space_number].army.index = scope.space[drag_space_number].army.index;
			scope.space[drag_space_number].army.index = -1;			

			setArmyAsMoved(scope);		
			
			$('#creature'+drop_space_number).draggable("disable");	    

        var socket = io.connect('http://localhost:8080'); 
    	  socket.emit('updateBoard', {data: scope.space});
     });
		
		
 	}
 });
$( ".target_area" ).droppable({
drop: function( event, ui ) {	

if(ui.draggable.hasClass('characterImage')){	
	var a = ui.draggable.children().attr('src');
}
else{
	var a = ui.draggable.attr('src');
	}

var id = $(this).parent().attr('id');

var space_number = parseInt(id.substring(2)); 

	drop_space_number = space_number;

 var scope = angular.element($("#board")).scope();
    scope.$apply(function(){
        scope.space[space_number].name = a.substring(19, a.length - 4);


   //Flip Image if Defender
	if(ui.draggable.hasClass('waitingImage')){     
   
   if(attackerOrDefender==='defend'){
		scope.space[space_number].player = "1";
	}
	else{
		scope.space[space_number].player = "2";
		}
	}

    })

//THERE'S A MORE EFFICIENT WAY THAN TO EMIT DATA USUALLY TWICE
	 var socket = io.connect('http://localhost:8080'); 

    scope.$apply(function(){
         socket.emit('updateBoard', {data: scope.space});
    })

}
});

$('#battle_button').click(function(){
   var socket = io.connect('http://localhost:8080');
	var scope = angular.element($("#board")).scope();
	    scope.$apply(function(){
         socket.emit('battle', {data: scope.space});
    })
	});


var totalSpaces = [];	
	
	function explore(space, movement){
		
	var scope = angular.element($("#board")).scope();
		
//	if(scope.space[space].player=="0"){

	if(movement==0){
		
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
		}
	else{
		
		for(var i=0; i<scope.space[space].neighbors.length; i++){
		
			explore(scope.space[space].neighbors[i], movement - 1);
				
			}	
			
		}
		
//	}
		return totalSpaces;	
	}
	
var creatures = {};
	
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

function unhighlightSpaces(){
		for(var i=0; i<27; i++){
			$('#id'+i).css('color', '#66CC66');		
		}
	}
	
function highlightAvailableMoves(availableSpaces){	
		for(var i=0; i<availableSpaces.length; i++){
			$('#id'+availableSpaces[i]).css('color', '#006600');		
		}	
	
	}
	
function setArmyAsMoved(scope){
	
		if(attackerOrDefender==="attack"){	     	 	
			scope.attackerarmy[scope.space[drop_space_number].army.index].canMove = 0;  
			scope.attackerarmy[scope.space[drop_space_number].army.index].location = drop_space_number;   	
	}
	else{
			scope.defenderarmy[scope.space[drop_space_number].army.index].canMove = 0;  
			scope.defenderarmy[scope.space[drop_space_number].army.index].location = drop_space_number;       
		}
		
}

function getAvailableSpaces(scope){

		if(attackerOrDefender==="defend"){
				var availableSpaces = explore(0, creatures[scope.defendwaiting[selectionSpot].name].skillFactor-1);
				availableSpaces = explore(1, creatures[scope.defendwaiting[selectionSpot].name].skillFactor-1);
				availableSpaces = explore(2, creatures[scope.defendwaiting[selectionSpot].name].skillFactor-1);
		}
		else{
				var availableSpaces = explore(23, creatures[scope.attackwaiting[selectionSpot].name].skillFactor-1);
				availableSpaces = explore(24, creatures[scope.attackwaiting[selectionSpot].name].skillFactor-1);
				availableSpaces = explore(25, creatures[scope.attackwaiting[selectionSpot].name].skillFactor-1);
				availableSpaces = explore(26, creatures[scope.attackwaiting[selectionSpot].name].skillFactor-1);	
			}		

		return availableSpaces;	
	
	}

function setSpaceArmy(scope){
	
	  if(attackerOrDefender==="attack"){
         scope.space[drop_space_number].player = 2;
         scope.space[drop_space_number].army.allegiance= "attacker";
         scope.attackwaiting[selectionSpot].name = "empty";
     }
     else if(attackerOrDefender==="defend"){
			scope.space[drop_space_number].player = 1;  
			scope.space[drop_space_number].army.allegiance= "defender";   	
			scope.defendwaiting[selectionSpot].name = "empty";
     	}
     	scope.space[drop_space_number].army.index= selectionSpot;   
	
	}