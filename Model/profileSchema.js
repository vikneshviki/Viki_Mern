const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
},
{timestamps:true});

module.exports = mongoose.model('profile', profileSchema);

