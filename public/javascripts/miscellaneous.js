$("img").error(function(){
   $(this).hide();
});



var selectionSpot;
var creatureName;
var attackerOrDefender;
var lastSelectedID = "empty";

$(function() {

$( "#tabs" ).tabs();

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
    
        scope.attackwaiting[selectionSpot].name = creatureName;
        $('#attackWaitingImage'+selectionSpot).show();
        }
        if(attackerOrDefender==="defender"){
			 scope.defendwaiting[selectionSpot].name = creatureName;
        $('#defendWaitingImage'+selectionSpot).show();
        $('#defendWaitingImage'+selectionSpot).css('-webkit-transform', 'rotate(180deg)');
			$('#defendWaitingImage'+selectionSpot).css('-moz-transform', 'rotate(180deg)');    
			$('#defendWaitingImage'+selectionSpot).css('-ms-transform', 'rotate(180deg)');		
			$('#defendWaitingImage'+selectionSpot).css('-o-transform', 'rotate(180deg)');	
			$('#defendWaitingImage'+selectionSpot).css('transform', 'rotate(180deg)');
        }
           var socket = io.connect('http://localhost:8080');
         
        socket.emit('updateWaitingArmies', {data: {"attackerarmy": scope.attackwaiting, "defenderarmy": scope.defendwaiting}});
    });

});


});  
