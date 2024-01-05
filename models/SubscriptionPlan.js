const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  nextPaymentDate: {
    type: Date,
    required: true
  },
  description: String
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
module.exports = SubscriptionPlan;
