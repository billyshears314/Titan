
function copyModelToAnotherSpace(scope){
		   	
	 	scope.space[drag_space_number].name = 'empty';
      scope.space[drop_space_number].player = scope.space[drag_space_number].player;
      scope.space[drag_space_number].player = '0';
     
		scope.space[drop_space_number].army.index = scope.space[drag_space_number].army.index;
		scope.space[drag_space_number].army.index = -1;			

		scope.space[drop_space_number].army.allegiance = scope.space[drag_space_number].army.allegiance;
		scope.space[drag_space_number].army.allegiance = 'none';
	
	}

function copyOver(scope, drag, drop){

		scope.space[drop].name = scope.space[drag].name;	
		scope.space[drag].name = 'empty';
		
      scope.space[drop].player = scope.space[drag].player;
      scope.space[drag].player = '0';
     
		scope.space[drop].army.index = scope.space[drag].army.index;
		scope.space[drag].army.index = -1;			

		scope.space[drop].army.allegiance = scope.space[drag].army.allegiance;
		scope.space[drag].army.allegiance = 'none';

	
	}
	
function setSpaceAsEmpty(scope, drag){	
	
		scope.space[drag].name = 'empty';
		scope.space[drag].player = '0';
		scope.space[drag].army.index = -1;
		scope.space[drag].army.allegiance = 'none';
	
	}