//Orient the topOrBottom arrow Correctly
	$('#arrow').css('-webkit-transform', 'rotate(270deg)');
	$('#arrow').css('-moz-transform', 'rotate(270deg)');    
	$('#arrow').css('-ms-transform', 'rotate(270deg)');		
	$('#arrow').css('-o-transform', 'rotate(270deg)');	
	$('#arrow').css('transform', 'rotate(270deg)');

//Fixes problem of empty image
$("img").error(function(){
   $(this).hide();
});

$( "#tabs" ).tabs();

var socket = io.connect('http://localhost:8080');