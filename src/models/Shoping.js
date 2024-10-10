const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    file1: {type: String},
    file2: {type: String},
    file3: {type: String},
    file4: {type: String},
    file5: {type: String},
    file6: {type: String},
    uploadID: {type: String},
    mainheading_h2: {type: String},
    mainheading_h3: {type: String},
    mainheading_h4: {type: String},
    mainheading_h6: {type: String},
    mainheading_p: {type: String},
},
{ timestamps: true }
);

module.exports = mongoose.model('Shoping', userSchema);