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
	$('#'+lastSelectedID).css('border-width', '0px');	
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
         $('#defendWaitingImage'+selectionSpot).css('-webkit-transform', 'rotate(180deg)');
			$('#defendWaitingImage'+selectionSpot).css('-moz-transform', 'rotate(180deg)');    
			$('#defendWaitingImage'+selectionSpot).css('-ms-transform', 'rotate(180deg)');		
			$('#defendWaitingImage'+selectionSpot).css('-o-transform', 'rotate(180deg)');	
			$('#defendWaitingImage'+selectionSpot).css('transform', 'rotate(180deg)');
        }
        socket.emit('updateWaitingArmies', {data: {"attackwaiting": scope.attackerarmy, "defendwaiting": scope.defenderarmy}});
    });

	});


});  
