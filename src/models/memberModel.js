const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    
    group_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
  },
   {timestamps:true}
);

module.exports = mongoose.models.Member || mongoose.model('Member', memberSchema);