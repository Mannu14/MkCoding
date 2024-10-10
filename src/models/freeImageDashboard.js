const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    img:{
        data: Buffer,
        contentType: String,
    },
    uploadClass: String,
    heading:String,
    headinginh4:String
},
{timestamps:true}
);

module.exports = mongoose.model('freeImageDownload', imageSchema);