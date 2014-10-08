var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var titan = require('./routes/titan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use(express.static(__dirname + '/public'));


titan.initializeModel();

var io = require('socket.io').listen(app.listen(8080));

var numberOfConnections = 0;

var playerNumbers = [];

var phase = "Setup";

var turn = 1;

io.sockets.on('connection', function (socket) {
	
var nextNumber = 1;	
	
	for(var i=0; i<playerNumbers.length; i++){
			if(playerNumbers[i]===nextNumber){
				nextNumber++;
				i=0;
			}
		}	
	playerNumbers.push(nextNumber);
	socket.playerNumber = nextNumber;
	console.log("Next Number: " + nextNumber);

	numberOfConnections++;
	socket.emit('getBoardModel', titan.getBoard());	
   socket.emit('getPlayerNumber', nextNumber);
   var turn_phase = {"turn": turn, "phase": phase};	
   socket.emit('getPhase', turn_phase);
	nextNumber++;

	//io.sockets.emit('updateConnections', numberOfConnections);
	console.log("Number of connections: " + numberOfConnections);

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    
      socket.on('battle', function(data){   	  	
    	  var boardAfterBattle = titan.attackTarget(data.data, data.attackerID, data.defenderID);
		  io.sockets.emit('getBoardModel', boardAfterBattle);    	
    	});

	socket.on('updateBoard', function(data){
		titan.updateServerModel(data);
		socket.broadcast.emit('getBoardModel', data);		
		});
		
	socket.on('updateWaitingArmies', function(data){
		socket.broadcast.emit('getWaitingArmies', data.data);
		});		
		
	socket.on('confirm', function(data){
			goToNextPhase(socket.playerNumber);
		});
		
	socket.on('concede', function(data){		
			socket.broadcast.emit('getConcede', data);
		});

    socket.on('disconnect', function(){

		var index = playerNumbers.indexOf(socket.playerNumber);
		if (index > -1) {
    		playerNumbers.splice(index, 1);
		}
   	numberOfConnections--; 
    	console.log("Number of connections: " + numberOfConnections);
  }); 
});

function goToNextPhase(playerNumber){
	if(phase==="Setup"){
		phase = "Movement";		
		}		
	else if(phase==="Movement"){
		phase = "Attack";		
		}	
	else if(phase==="Attack"){
		phase = "Retaliation";		
		}
	else if(phase==="Retaliation"){
		phase = "Movement";		
		turn++;
	}
	
   var turn_phase = {"turn": turn, "phase": phase}	
	
	io.sockets.emit('getPhase', turn_phase);	
	}

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
