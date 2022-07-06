const mongoose = require('mongoose');
const  { Schema } = mongoose;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 1,
        max: 20,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
});

const AdminModel = mongoose.model('AdminModel', AdminSchema);

module.exports = AdminModel;
