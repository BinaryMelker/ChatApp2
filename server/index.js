"use strict";
var express = require("express");
var path = require('path');
var chat_app = require('express')();
var http = require('http').Server(chat_app);
var io = require('socket.io')(http);
var clientListNames = [];
var port = 3000;

chat_app.use(express.static(__dirname, '/'));
chat_app.use(express.static(__dirname, '/server/'));
chat_app.use(express.static(__dirname + "/..", '/client/'));
chat_app.use(express.static(__dirname + '/node_modules'));

chat_app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

chat_app.get('/chat', function(req, res){
	res.redirect('/');
});

io.on('connection', function(socket){
	clientListNames.push(socket.handshake.query.userName);
	io.emit("updateSocketList", clientListNames);
	io.emit("addUserToSocketList",socket.handshake.query.userName);
	
	socket.on('disconnect', function(){
		var name=socket.handshake.query.userName;
		var userIndex = clientListNames.indexOf(socket.handshake.query.userName);
		 if (userIndex != -1) {
		 	clientListNames.splice(userIndex, 1);
			io.emit("updateSocketList", clientListNames);
			io.emit("removeUserFromSocketList",name);
		 }
  	});

	socket.on('chatMessageToSocketServer', function(msg, func){
		func("Message recieved!",socket.handshake.query.userName);
		var name = socket.handshake.query.userName;
		var sockectObj = {name,msg}
		io.emit('broadcastToAll_chatMessage', sockectObj);
	});
});

http.listen(port, function(){
  console.log('listening on port:' + port);
});