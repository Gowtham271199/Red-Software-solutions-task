const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['yes/no'], required: true },
    survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' }
});

module.exports = mongoose.model('Question', questionSchema);
