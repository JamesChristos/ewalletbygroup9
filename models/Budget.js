const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    remainingDays: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: String
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
