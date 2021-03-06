var selectionSpot;
var creatureName;
var attackerOrDefender;
var lastSelectedID = "empty";

/*
var pointer = 1;

initialize();

function initialize(){
	
	for(var i=1; i<7; i++){
		
	$('#defenderStartingSpot'+i).hide();
	$('#attackerStartingSpot'+i).hide();
		}	
	
	}
*/

$(function() {

	$('.add_creature_button').click(function(){
		selectionSpot = $(this).attr('id');
		attackerOrDefender = selectionSpot.substring(0,8);
		selectionSpot = selectionSpot.substring(20);
	});

	$('.addCharacterImage').click(function(){
	
		if(lastSelectedID!=="empty"){
			CSS.defaultOutline(lastSelectedID);
		}
		
		$(this).css('border-width', '3px');
		lastSelectedID = $(this).attr('id');
		creatureName = $(this).attr('src');
		creatureName = creatureName.substring(19, creatureName.length - 4);
	});

	$('#add_creature_btn').click(function(){


		var scope = angular.element($("#board")).scope();
		scope.$apply(function(){
		
			if(attackerOrDefender==="attacker"){    
				scope.attackerarmy[selectionSpot].name = creatureName;
		   	$('#attackWaitingImage'+selectionSpot).show();
		   }
		   
		   if(attackerOrDefender==="defender"){
				scope.defenderarmy[selectionSpot].name = creatureName;
		      $('#defendWaitingImage'+selectionSpot).show();
		      CSS.rotate('defendWaitingImage'+selectionSpot, 180);
			}
			console.log(JSON.stringify(scope.attackerarmy));
		   socket.emit('updateWaitingArmies', {data: {"attackerarmy": scope.attackerarmy, "defenderarmy": scope.defenderarmy}});
		});

	});

});  
