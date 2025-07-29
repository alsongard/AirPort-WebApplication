const mongoose = require('mongoose');

const UserAirPortStats = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    memberSince: {
        type: Date,
        required: true
    },
    loyaltyTier: {
        type: String,
        required: true
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    nextTierPoints: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('UserAirPortStat', UserAirPortStats);

