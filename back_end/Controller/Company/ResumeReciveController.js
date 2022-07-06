const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const ReciveResu = require('../../Models/Company/ResumeReciveSchema');
const CreateJob = require('../../Models/Company/CreateJobeSchema');

const ReciveResume = async (req, res) => {

    const {postedjobid, joberId, firstname, lastname, roll, experience, description, email, phoneno, linkedin, location, git, technicalsills, education, projects, languages, hobbies} = req.body;

    try {

        let newResume;
        newResume = new ReciveResu({
            postedjobid,
            joberId,
            firstname,
            lastname,
            roll,
            experience,
            description,
            email,
            phoneno,
            linkedin,
            location,
            git,
            technicalsills,
            education,
            projects,
            languages,
            hobbies,
            // avatar: req.file ? req.file.filename : null,
        });
        await newResume.save().then((data) => {
            res.status(200).json({
                status: 200,
                message: ' Job Create SuccessFully ',
                data
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })

    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error while Calling Resume Send Api');
    }
}

// get Applyed Resume List get Jober

const applyedResumeList = async (req, res) => {
    try {
        const {joberId} = req.body;

        await ReciveResu.aggregate([
            {$match: {joberId: mongoose.Types.ObjectId(joberId)}},
            {
                $lookup: {
                    from: 'createjobposts',
                    localField: "postedjobid",
                    foreignField: "_id",
                    pipeline: [

                        {
                            $lookup: {
                                from: 'companymods',
                                localField: "companyId",
                                foreignField: "_id",
                                pipeline: [
                                    {
                                        $project: {password: 0, _id: 0}
                                    }
                                ],
                                as: "company"
                            }
                        },
                        {$unwind: {path: "$company", preserveNullAndEmptyArrays: true}}
                    ],
                    as: "resumes"
                }
            },
            {$unwind: {path: "$resumes", preserveNullAndEmptyArrays: true}}
        ]).then((data) => {
            res.status(200).json({
                // message: 'Job Updated',
                data
            })
        }).catch((e) => {
            console.log(e.message)
        });
    } catch (error) {
        console.log('Error :', error.message);
    }
}

// Get Sended Resume Show Company Peticuler Id vicy Show Our Jobs's resume

const getJoberResume = async (req, res) => {
    try {
        const {_id} = req;
        const {companyId} = req.body;

        await CreateJob.aggregate([
            {$match: {companyId: mongoose.Types.ObjectId(companyId)}},
            {
                $lookup: {
                    from: "reciveresumes",
                    localField: "_id",
                    foreignField: "postedjobid",
                    pipeline: [
                        {
                            $project: {joberId: 0, postedjobid: 0}
                        }
                    ],
                    as: "resumes"
                }
            },
            {
                $addFields: {
                    relength: {
                        $size: "$resumes"
                    }
                }
            },

        ]).then((data) => {
            res.status(200).json({
                // status: 200,
                // message: 'Job Updated',
                data
            })
        }).catch((e) => {
            console.log(e.message)
        });
    } catch (error) {
        console.log('Error :', error.message);
        console.log('Error While Calling Update Resume Status');
    }


}

// Change reacyme Status on Comapny
const ChangeStatus = async (req, res) => {

    try {
        const {id, status} = req.body;

        await ReciveResu.updateOne({_id: id}, {status}).then((data) => {
            res.status(200).json({
                status: 200,
                message: 'Job Updated',
                data
            })
        }).catch((e) => {
            console.log(e.message)
        });
    } catch (error) {
        console.log('Error :', error.message);
        console.log('Error While Calling Update Resume Status');
    }
}

module.exports = {ReciveResume, applyedResumeList, getJoberResume, getJoberResume, ChangeStatus};
