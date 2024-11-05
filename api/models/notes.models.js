const mongoose = require('mongoose')

// schema 
const notesSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    images: {
        type: Array,
    }
},{
    timestamps: true,
})

// exports
module.exports = mongoose.models.Note || mongoose.model('Note',notesSchema)