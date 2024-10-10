const mongoose = require('mongoose');

const realtimeProjectsSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
    },
    uploadClass: String,
    uploadID: String,
    mainheading_h2: String,
    mainheading_h3: String,
    mainheading_h6: String,
    mainheading_p: String,
    textarea_h4: String,
    textarea_h5: String,
    textarea: String,
}, { timestamps: true });

const realtimeProjectsModel = mongoose.model('realtimeProjects', realtimeProjectsSchema);

module.exports = realtimeProjectsModel;