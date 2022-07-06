const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const  { Schema } = mongoose;

const JoberSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 1,
        max: 20,
        lowercase: true
    },
    surname:{
        type: String,
        required: true,
        trim: true,
        min:1,
        max: 20
    },
    education:{
        type: String,
        required: true,
        trim: true
    },
    work:{
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
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


const JobMod = mongoose.model('JobMod', JoberSchema);

module.exports = JobMod;

