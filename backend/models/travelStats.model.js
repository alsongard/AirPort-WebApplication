const mongoose = require('mongoose');

const UserTravellingStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalTrips: {
        type: Number,
        default: 0
    },
    totalDistance: {
        type: Number,
        default: 0 // in kilometers
    },
    lastTripDate: {
        type: Date,
        default: new Date()
    },
    countriesVisited: {
        type: Number,
        default: 0
    },
    
}, {
    timestamps: true
});


// UserTravellingStatsSchema.pre('save', function(next){
//     this.lastTripDate = new Date();
//     next();
// })

const UserTravellingStats = mongoose.model('TravellingStat', UserTravellingStatsSchema);
module.exports = UserTravellingStats;