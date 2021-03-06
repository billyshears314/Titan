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

		CSS.unhighlightSpaces();			

		var scope = angular.element($("#board")).scope();
		
			scope.$apply(function(){		  	
				setSpaceArmy(scope)		  		  			  	
				setArmyAsMoved(scope);     	 	
     		});
     
      moveOrder.push(scope.space[drop_space_number].army.index);    
     
      var socket = io.connect('http://localhost:8080'); 
    	socket.emit('updateBoard', {data: scope.space});
    	socket.emit('updateWaitingArmies', {data: {"attackerarmy": scope.attackerarmy, "defenderarmy": scope.defenderarmy}});
     
	}
 });
 
$(".creatureOnTarget").draggable({
helper: "clone",
revert: "invalid",
start: function(event, ui){
		var scope = angular.element($("#board")).scope();

		drag_space_number = getID($(this), 'creatureOnTarget');
			var availableSpaces = explore(drag_space_number, creatures[scope.space[drag_space_number].name].skillFactor, false);
			CSS.highlightAvailableMoves(availableSpaces);
	
			totalSpaces = [];

	},

stop: function( event, ui ) {

		CSS.unhighlightSpaces();
		
		var scope = angular.element($("#board")).scope();	
		
		   scope.$apply(function(){

				moveModelToAnotherSpace(scope, drag_space_number, drop_space_number);
				setArmyAsMoved(scope);		
				
     		});

			moveOrder.push(scope.space[drop_space_number].army.index); 	      		
     		
			var socket = io.connect('http://localhost:8080'); 
			socket.emit('updateBoard', {data: scope.space});		
		
 	}
 });
$( ".target_area" ).droppable({
drop: function( event, ui ) {	

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
	
	var availableMoves = getAvailableSpaces(scope);
	CSS.highlightAvailableMoves(availableMoves);
		
	totalSpaces = [];
	
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



