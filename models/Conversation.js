const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    participants: [{
        ref: 'User',
        type: Schema.Types.ObjectId,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Conversation', ConversationSchema);
