const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minLength: [3, "Name must be at least 3 characters!"]
    },
    petType: {
        type: String,
        required: [true, "Pet type is required!"],
        minLength: [3, "Pet type must be at least 3 characters!"]
    },
    description: {
        type: String,
        required: [true, "Pet description is required!"],
        minLength: [3, "Pet Description must be at least 3 characters!"]
    },
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String },
}, {timestamps: true});

module.exports = mongoose.model('Pet', PetSchema);