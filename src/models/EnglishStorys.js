const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    uploadClass:{
        type:String,
        required:true
    },
    img:{
        data: Buffer,
        contentType: String,
    },
    mainheading_h2:{
        type:String,
    },
    mainheading_p:{
        type:String,
    },
    mainheading_span_1: String,
    mainheading_span_2: String,
    mainheading_span_3: String,
    mainheading_span_4: String,
},
{timestamps:true}
);

module.exports = mongoose.model('EnglishStory', imageSchema);