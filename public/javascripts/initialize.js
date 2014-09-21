//Orient the topOrBottom arrow Correctly
CSS.rotate('arrow', 270);

//Fixes problem of empty image
$("img").error(function(){
   $(this).hide();
});

$( "#tabs" ).tabs();

var socket = io.connect('http://localhost:8080');