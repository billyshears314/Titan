	 var messages = [];
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
        
     socket.on('message', function (data) {
        if(data.message) {

	    messages.push('<b>Player ' +data.player +':  </b>' + data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;

        } else {
            console.log("There is a problem:", data);
        }
    });
    
    sendButton.onclick = function() {
   	var text = field.value;
   	var scope = angular.element($("#board")).scope();
      socket.emit('send', { message: text, player: scope.playerNumber });
	   $('#field').val('');
    };
    
       $("input").keyup(function(e) {
		 e.preventDefault();
       if(e.keyCode == 13) {
	    var text = field.value;
	    var scope = angular.element($("#board")).scope();
       socket.emit('send', {message: text, player: scope.playerNumber });
	    $('#field').val('');
        }
    });
    