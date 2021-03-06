var GameState = (function () {

	var attackerOrDefender, 
		 topOrBottom;

	var getAttackerOrDefender = function () {
   	return attackerOrDefender;
   };
   
  	var setAttackerOrDefender = function (value) {
  		attackerOrDefender = value;
  	};
  	
  	var getTopOrBottom = function () {
   	return topOrBottom;
   };
   
  	var setTopOrBottom = function (value) {
  		topOrBottom = value;
  	};

	return {
		getAttackerOrDefender: getAttackerOrDefender,
		setAttackerOrDefender: setAttackerOrDefender,
		getTopOrBottom: getTopOrBottom,
		setTopOrBottom: setTopOrBottom
	};

})();