var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var util = require('util');
var exec = require('child_process').exec;

var CODE = '1234';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('code', function(data){
    console.log("code " + data);
    if(data === CODE){
        //Success
        console.log('success, gate will open');

        //Open poort
        
        //Make sure the pin is on output
        exec('gpio mode 8 out');

        //Pull pin to ground, and release immediatly after
        exec('gpio write 8 0; sleep 1; gpio write 8 1');

    }else{
        socket.emit('clear');
    }
  });



});

http.listen(80, function(){
  console.log('listening on *:80');
});