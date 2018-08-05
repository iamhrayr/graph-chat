const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    text: String,
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    conversation: {
        ref: 'Conversation',
        type: Schema.Types.ObjectId,
    },
}, { timestamp: true });

module.exports = mongoose.model('Message', MessageSchema);
