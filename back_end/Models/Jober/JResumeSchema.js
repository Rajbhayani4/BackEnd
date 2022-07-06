const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const  { Schema } = mongoose;

const JResumeSchema = new Schema({

    joberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobmods",
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phoneno: {
        type: Number,
        required: true,
    },
    linkedin: {
        type: String,
    },
    location: {
        type: String,
    },
    git: {
        type: String,
    },
    technicalsills: {
        type: String,
        required: true,
        trim: true,
    },
    education: {
        type: String,
        required: true,
        trim: true,
    },
    projects: {
        type: String,
        required: true,
        trim: true,
    },
    languages: {
        type: String,
        required: true,
        trim: true,
    },
    hobbies: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        required: true
    }
})

const JResu = mongoose.model('JResume', JResumeSchema);

module.exports = JResu;
