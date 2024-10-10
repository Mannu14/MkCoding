require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../src/models/registers');
const Chat = require('../src/models/chatModel')
const Chatsave = require('../src/models/chatModelsave')
const Group = require('../src/models/groupModel')
const Member = require('../src/models/memberModel')
const GroupChat = require('../src/models/groupChatModel');


const logoutchat = async(req,res) =>{
    try {
        res.clearCookie('user');
        req.session.destroy();
        res.redirect("/login"); 
    } catch (error) {
        console.log(error.message);
    }
}
const loadDashboard = async(req,res) =>{
    try {
       var users = await User.find({_id:{ $nin:[req.session.user._id] }});
        res.render("dashboardchat",{user: req.session.user,users:users});
    } catch (error) {
        console.log(error.message);
    }
}

const saveChat = async (req, res) => {
    try {
        var chat = new Chat({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            message: req.body.message,
        });

        // Save the chat in the "Chatsave" model
        const chatInChatsaveModel = new Chatsave(chat);
        const newChatInChatsaveModel = await chatInChatsaveModel.save();
        
        var newChat = await chat.save();
        
        res.status(200).send({ success: true, msg: 'Chat inserted', data: newChat });
    } catch (error) {
        res.status(404).send({ success: false, msg: error.message });
    }
}

const deleteChat = async(req,res)=>{
    try {
        await Chat.deleteOne({_id:req.body.id});
        res.status(200).send({success:true});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const updateChat = async(req,res)=>{
    try {
        await Chat.findByIdAndUpdate({_id:req.body.id},{
            $set:{
                message:req.body.message
            }
        });
        res.status(200).send({success:true});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const loadGroups = async(req,res)=>{
    try {
        const groups = await Group.find({ creator_id:req.session.user._id});
        
        res.render('group',{groups:groups});
    } catch (error) {
        console.log(error.message);
    }
}
const createGroup = async(req,res)=>{
    try {
       
        const group = new Group({
            creator_id:req.session.user._id,
            name:req.body.name,
            image:'images/'+req.file.filename,
            limit:req.body.limit
        });
        
        await group.save();
        const groups = await Group.find({ creator_id:req.session.user._id});
        res.render('group',{message:req.body.name +' Group created Successfully',groups:groups});
    } catch (error) {
        console.log(error.message);
    }
}

const getMembers = async (req, res) => {
    try {
        var users = await User.aggregate([
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "user_id",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$group_id", new mongoose.Types.ObjectId(req.body.group_id)] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "member"
                }
            },
            {
                $match: {
                    "_id": {
                        $nin: [new mongoose.Types.ObjectId(req.session.user._id)]
                    }
                }
            }
        ]);

        // console.log('Users after aggregation:', users); // Debug: Log the retrieved users

        res.status(200).send({ success: true, data: users });
    } catch (error) {
        console.error('Error in getMembers:', error); // Debug: Log any errors
        res.status(400).send({ success: false, msg: error.message });
    }
}


const addMembers = async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Debug: Check the request body
        // console.log("Received Members: ", req.body['members[]'].length);
        if (!req.body['members[]'] || req.body['members[]'].length == 0) {
            res.status(200).send({ success: false, msg: "Please select any one Member" });
        } else if (req.body['members[]'].length > parseInt(req.body.limit)) {
            res.status(200).send({ success: false, msg: 'You can not select more than ' + req.body.limit + ' Members' });
        } else {
            console.log('Deleting existing members...'); // Debug: Check if existing members are being deleted
            await Member.deleteMany({ group_id: req.body.group_id });

            var data = [];
            const members = req.body['members[]'];
            for (let i = 0; i < members.length; i++) {
                data.push({
                    group_id: req.body.group_id,
                    user_id: members[i]
                });
            }
            console.log('Adding new members...'); // Debug: Check if new members are being added
            await Member.insertMany(data);
            res.status(200).send({ success: true, msg: "Members added Successfully" });
        }
    } catch (error) {
        console.error('Error:', error); // Debug: Log any errors
        res.status(400).send({ success: false, msg: error.message });
    }
}


const updateChatGroup = async(req,res) =>{
    try {
        if(parseInt(req.body.limit) < parseInt(req.body.last_limit)){
            await Member.deleteMany({group_id: req.body.id});
        }
        var updateObj;

        if(req.file != undefined){
            updateObj = {
                name:req.body.name,
                image:'images/'+req.file.filename,
                limit:req.body.limit,
            }
        }else{
            updateObj = {
                name:req.body.name,
                limit:req.body.limit,
            }
        }
        // console.log(updateObj);
        
        await Group.findByIdAndUpdate({_id:req.body.id},{
            $set: updateObj
        });

        res.status(200).send({success:true,msg:"Chat Group Updated Successfully!"});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}

const deleteChatGroup  = async(req,res)=>{
    try {
        if (req.file && req.file.filename) {
            const fileName = req.file.filename;
            console.log(fileName);
        }
        else{
        // console.log(req.body.id);
        await Group.deleteOne({ _id:req.body.id});
        await Member.deleteMany({ group_id:req.body.id});

        res.status(200).send({success:true,msg:"Chat Group deleted Successfully!"});
        }
    } catch (error) {
        console.log("erroe");
        res.status(400).send({success:false,msg:error.message});
    }
}

const shareGroup = async(req,res)=>{
    try {
        var groupData = await Group.findOne({_id:req.params.id});
        if(!groupData){
            res.render('error',{message:'404 not found!'});
        }
        else if(req.session.user == undefined){
            res.render('error',{message:'you need to login to access the Share URL!'});
        }
        else{
            
            var totalMembers = await Member.find({group_id:req.params.id}).count();
            var avilable = groupData.limit - totalMembers;

            var isOwner = groupData.creator_id == req.session.user._id ? true:false;
            var isJoined = await Member.find({group_id: req.params.id, user_id: req.session.user._id}).count();

            res.render('shareLink',{group: groupData, avilable:avilable, totalMembers:totalMembers, isOwner:isOwner, isJoined:isJoined})

        }
    } catch (error) {
        console.log(error.message);
    }
}

const joinGroup = async(req,res)=>{
    try {

        const member = new Member({
            group_id:req.body.group_id,
            user_id:req.session.user._id
        });
        await member.save();

        res.send({success:true, msg:'Congratulation, you have Joined the group Successfully!'})
    } catch (error) {
        res.send({success:false, msg:error.message});
    }
}

const groupChats = async(req,res)=>{
    try {
        const myGroups = await Group.find({ creator_id:req.session.user._id});
        const joinedGroups = await Member.find({ user_id:req.session.user._id}).populate('group_id');

        res.render('chat-group',{myGroups:myGroups,joinedGroups:joinedGroups});

    } catch (error) {
        console.log(error.message);
    }
}

const saveGroupChat = async(req,res)=>{
    try {

        var chat = new GroupChat({
            sender_id: req.body.sender_id,
            group_id: req.body.group_id,
            message: req.body.message
        });
        var newChat = await chat.save();
        var cChat = await GroupChat.findOne({_id:newChat._id}).populate('sender_id');

        res.send({success:true, chat: cChat})
    } catch (error) {
        res.send({success:false, msg:error.message});
    }
};

const loadGroupChats = async(req,res)=>{
    try {

        const groupChats = await GroupChat.find({group_id: req.body.group_id}).populate('sender_id');

        res.send({success:true,chats:groupChats})
    } catch (error) {
        res.send({success:false, msg:error.message});
    }
};

const deleteGroupChat = async(req,res)=>{
    try {
        await GroupChat.deleteOne({_id:req.body.id});

        res.send({success:true, msg:'chat Deleted !'})
    } catch (error) {
        res.send({success:false, msg:error.message});
    }
};

const updateGroupChat = async(req,res)=>{
    try {
        await GroupChat.findByIdAndUpdate({_id:req.body.id},{
            $set:{
                message:req.body.message
            }
        });

        res.send({success:true, msg:'chat Updated !'})
    } catch (error) {
        res.send({success:false, msg:error.message});
    }
};

module.exports = {
    logoutchat,
    loadDashboard,
    saveChat,
    deleteChat,
    updateChat,
    loadGroups,
    createGroup,
    getMembers,
    addMembers,
    updateChatGroup,
    deleteChatGroup,
    shareGroup,
    joinGroup,
    groupChats,
    saveGroupChat,
    loadGroupChats,
    deleteGroupChat,
    updateGroupChat
}