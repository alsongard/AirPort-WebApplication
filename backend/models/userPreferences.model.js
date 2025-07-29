const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserPreferencesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seatPreference: {
        type: String,
        enum: ['Window', 'Aisle', 'Middle'],
        default: 'Window'
    },
    mealPreference: {
        type: String,
        enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Kosher', 'Halal'],
        default: 'Vegetarian'
    },
    classPreference: {
        enum: ['Economy', 'Premium Economy', 'Business', 'First'],
        default: 'Business'
    },
    notifications: {
        type: Boolean,
        default: true
    },
    newsletter: {
        type: Boolean,
        default: true
    },
    smsAlerts: {
        type: Boolean,
        default: false
    }
});

const UserPreference = mongoose.model('UserPreference', UserPreferencesSchema);
module.exports = UserPreference;