require('dotenv').config();
var mongoose = require('mongoose');
require("./db/conn");
const app = require('express')();
const http = require('http').Server(app);
const userRoute = require('../Route/userRoute')
app.use("/",userRoute);

const port = process.env.PORT || 8000

const User = require('./models/registers');
const Chat = require('./models/chatModel');

const io = require("socket.io")(http);
var usp = io.of('/user-namespace');  // we can anything which is your choice

usp.on('connection',async function(socket){
    // console.log('user Connected');
    var userId = socket.handshake.auth.token;
    await User.findByIdAndUpdate({_id: userId}, {$set: {is_online:'1'}});
    // user broadcast online status
    socket.broadcast.emit('getOnlineUser', {user_id: userId});

    socket.on('disconnect',async function(){
        // console.log('user Disconnected');
        var userId = socket.handshake.auth.token;
        await User.findByIdAndUpdate({_id: userId}, {$set: {is_online:'0'}});
        // user broadcast Offline status
         socket.broadcast.emit('getOfflineUser', {user_id: userId});

    });
    // chatting implementation
    socket.on('newChat', function(data){
        socket.broadcast.emit('loadNewChat',data);
    })

    // load old chats
     socket.on('existsChat',async function(data){
        var chats = await Chat.find({ $or:[
            { sender_id: data.sender_id, receiver_id: data.receiver_id},
            { sender_id: data.receiver_id, receiver_id: data.sender_id},
        ]});

        socket.emit('loadChats', { chats:chats });
     });

    //  chats delete
    socket.on('chatDeleted',function(id){
       socket.broadcast.emit('chatMessageDeleted', id);  
    })
    //  chats update
    socket.on('chatUpdated',function(data){
       socket.broadcast.emit('chatMessageUpdated', data);  
    })
    // new group chat added
    socket.on('newGroupChat', function(data){
        socket.broadcast.emit('loadNewGroupChat',data); // broadcast group chat object
    });
    socket.on('groupChatDeleted', function(id){
        socket.broadcast.emit('groupChatMessageDeleted',id); // broadcast chat deleted id
    });
    socket.on('groupChatUpdated', function(data){
        socket.broadcast.emit('groupChatMessageUpdated',data); // broadcast chat deleted id
    });

});
// ===== chat-end=====



http.listen(port, console.log(`server is runnong at PORT NO. ${port}`));