const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    text: String,
    from: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    to: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
}, { timestamp: true });

module.exports = mongoose.model('Message', MessageSchema);
