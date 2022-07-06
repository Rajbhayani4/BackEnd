const mongoose = require('mongoose');
const  { Schema } = mongoose;

const CreateJobsSchema = new Schema({


    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companymods",
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    leavel: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    vacancy: {
        type: String,
        required: true,
    },
    jobtime: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

});

const CreateJob = mongoose.model('CreateJobPost', CreateJobsSchema);

module.exports = CreateJob;
