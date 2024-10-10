const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    
    creator_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        ref:'user'
    },
    image:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.models.Group || mongoose.model('Group', groupSchema);