var space_number = -1;
var drop_space_number = -1;
var drag_space_number = -1;

var selectionSpot = -1;
var attackerOrDefender;

var totalSpaces = [];	
var moveOrder = [];

 $( ".waitingImage" ).draggable({
 helper: "clone",
 revert: "invalid",
 
 start: function(event, ui){
		selectionSpot = getID($(this), 'waitingImage');	
		attackerOrDefender = getAttackerOrDefender($(this));
		
		highlightMoveOptions();		
	
	},
	stop: function( event, ui ) {
		console.log("STOP!!!!!");		
		unhighlightSpaces();			
	
		//drop_space_number = getID($(this), 'targetArea');	
		console.log("DROP: " + drop_space_number);		
		var scope = angular.element($("#board")).scope();
		
	scope.$apply(function(){		  	
		  	
		setSpaceArmy(scope)		  		  			  	
		setArmyAsMoved(scope);     	
     	
		moveOrder.push(scope.space[drop_space_number].army.index);     	
     	console.log(JSON.stringify(moveOrder));
       var socket = io.connect('http://localhost:8080'); 
    	  socket.emit('updateBoard', {data: scope.space});
    	   socket.emit('updateWaitingArmies', {data: {"attackwaiting": scope.attackerarmy, "defendwaiting": scope.defenderarmy}});
     });
     
	}
 });
 
 $(".creatureOnTarget").draggable({
 helper: "clone",
revert: "invalid",

start: function(event, ui){

		console.log("START");

		var scope = angular.element($("#board")).scope();
		
	//	if(scope.phase==='Movement'){

		drag_space_number = getID($(this), 'creatureOnTarget');
			var availableSpaces = explore(drag_space_number, creatures[scope.space[drag_space_number].name].skillFactor, false);
			highlightAvailableMoves(availableSpaces);
			totalSpaces = [];
		
	//	}
	},

stop: function( event, ui ) {
		console.log("STOP");
		unhighlightSpaces();
		
		var scope = angular.element($("#board")).scope();	
		
		   scope.$apply(function(){

			copyModelToAnotherSpace(scope);

			setArmyAsMoved(scope);		
			
			moveOrder.push(scope.space[drop_space_number].army.index); 
			
		//	$('#creature'+drop_space_number).draggable("disable");	    

        var socket = io.connect('http://localhost:8080'); 
    	  socket.emit('updateBoard', {data: scope.space});
     });
		
		
 	}
 });
$( ".target_area" ).droppable({
drop: function( event, ui ) {	
console.log("DROP");

	var imageSrc = ui.draggable.attr('src');

	drop_space_number = getID($(this), 'targetArea');
	
	 var scope = angular.element($("#board")).scope();
    scope.$apply(function(){
      scope.space[drop_space_number].name = imageSrc.substring(19, imageSrc.length - 4);
    })

//THERE'S A MORE EFFICIENT WAY THAN TO EMIT DATA USUALLY TWICE
	 var socket = io.connect('http://localhost:8080'); 
    socket.emit('updateBoard', {data: scope.space});   

}
});
	
	
function highlightMoveOptions(){
				
	var scope = angular.element($("#board")).scope();
	
	var availableSpaces = getAvailableSpaces(scope);
	highlightAvailableMoves(availableSpaces);
		
	totalSpaces = [];
	
}


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

function setSpaceArmy(scope){
		console.log("DROP: " + drop_space_number);
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

	
/*GET JQUERY IDS*/
function getID(jquery, whichtype){

	var id;

	if(whichtype==="waitingImage"){

		id = jquery.attr('id');
		id = id.substring(18);
	}	
	if(whichtype==="targetArea"){
	
		id = jquery.parent().attr('id');	
		id = parseInt(id.substring(2));
	}		
	if(whichtype==="creatureOnTarget"){
		id = jquery.parent().parent().attr('id');
		id = parseInt(id.substring(2));
	}	
	
	return id;
}

function getAttackerOrDefender(jquery){
	
	var attOrDef;	

	var id = jquery.attr('id');
	attOrDef = id.substring(0,6);
	
	return attOrDef;
}