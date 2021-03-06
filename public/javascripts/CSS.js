var CSS = (function () {

	var rotate = function (name, degreeAmount) {
    
		$('#'+name).css('-webkit-transform', 'rotate('+degreeAmount+'deg)');
		$('#'+name).css('-moz-transform', 'rotate('+degreeAmount+'deg)');    
		$('#'+name).css('-ms-transform', 'rotate('+degreeAmount+'deg)');		
		$('#'+name).css('-o-transform', 'rotate('+degreeAmount+'deg)');	
		$('#'+name).css('transform', 'rotate('+degreeAmount+'deg)');
   };

	var outlineTarget = function (scope, id, i) {
    
    	$('#creature'+scope.space[id].neighbors[i]).css('border-style', 'solid');	
		$('#creature'+scope.space[id].neighbors[i]).css('border-width', '2px');		
		$('#creature'+scope.space[id].neighbors[i]).css('color', '#FF0000');		
	};
	
	var outlineWhichCanAttack = function (canAttack) {
		
		for(var i=0; i<canAttack.length; i++){
			$('#creature'+canAttack[i]).css('border-style', 'solid');
			$('#creature'+canAttack[i]).css('border-width', '2px');
			$('#creature'+canAttack[i]).css('color', '#00FF00');
		}
	};
	
	var defaultOutline = function (name) {
		$('#'+name).css('border-width', '0px');
	};
	
	var unhighlightSpaces = function () {
		for(var i=0; i<27; i++){
			$('#id'+i).css('color', '#66CC66');		
		}
	};
	
	var highlightAvailableMoves = function (availableMoves) {
		for(var i=0; i<availableMoves.length; i++){
			$('#id'+availableMoves[i]).css('color', '#006600');		
		}	
	};
  
	return {
		rotate: rotate,
		outlineTarget: outlineTarget,
		outlineWhichCanAttack: outlineWhichCanAttack,
		defaultOutline: defaultOutline,
		unhighlightSpaces: unhighlightSpaces,
		highlightAvailableMoves: highlightAvailableMoves
  };

})();