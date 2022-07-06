const mongoose = require('mongoose');
const  { Schema } = mongoose;

const ComapnySchema = new Schema({

    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 1,
        max: 20,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 1,
        max: 20,
        lowercase: true
    },
    work:{
        type: String,
        required: true,
        trim: true
    },
    Salary:{
        type: String,
        required: true,
        trim: true
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
    avatar: {
        type: String,
        required: true
    }

});

const CompanyMod = mongoose.model('CompanyMod', ComapnySchema);

module.exports = CompanyMod;

