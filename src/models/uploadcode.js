const mongoose = require('mongoose');

const uploadcodeSchema = new mongoose.Schema({

    img:{
        data: Buffer,
        contentType: String,
    },
    uploadID: String,
    uploadClass: String,
    mainheading_h2: String,
    mainheading_h3: String,
    mainheading_h4: String,
    mainheading_h5: String,
    mainheading_h6: String,
    mainheading_p: String
},
{timestamps:true}
);

module.exports = mongoose.model('uploadcode', uploadcodeSchema);