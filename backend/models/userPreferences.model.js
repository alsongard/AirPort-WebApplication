const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserPreferencesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
        type:String,
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
});

const UserPreference = mongoose.model('UserPreference', UserPreferencesSchema);
module.exports = UserPreference;