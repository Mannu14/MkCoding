const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
    
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    group_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    message:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.models.GroupChat || mongoose.model('GroupChat', groupChatSchema);