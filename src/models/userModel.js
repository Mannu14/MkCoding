const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    img:{
        data: Buffer,
        contentType: String,
    },
    uploadClass: String,
    uploadID: String,
    mainheading_h2: String,
    mainheading_h3: String,
    mainheading_h4: String,
    mainheading_h5: String,
    mainheading_h6: String,
    mainheading_p: String,
    mainheading_span_1: String,
    mainheading_span_2: String,
    mainheading_span_3: String,
    mainheading_span_4: String,
    mainheading_Snumber_1: String,
    mainheading_Snumber_2: String,
    mainheading_Snumber_3: String,
    mainheading_Snumber_4: String,
    textarea_h4: String,
    textarea_h5: String,
    textarea: String,
},
{timestamps:true}
);

module.exports = mongoose.model('dashboard', imageSchema);