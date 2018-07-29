const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    name: String,
}, { timestamp: true });

module.exports = mongoose.model('Conversation', ConversationSchema);
