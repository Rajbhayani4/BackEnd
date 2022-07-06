const express = require('express');
const bcrypt = require('bcryptjs');
const JResu = require('../../Models/Jober/JResumeSchema');

const JResume = async (req, res) => {

    const {joberId, firstname, lastname, roll, experience, description, email, phoneno, linkedin, location, git, technicalsills, education, projects, languages, hobbies} = req.body;

    const createResume = await JResu.findOne({joberId});

    try {
        if (createResume) {
            return res.status(401).json('Resume is All ready Created');
        } else {
            let newResume;
            newResume = new JResu({
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
                avatar: req.file ? req.file.filename : null,
            });
            await newResume.save();
            res.status(200).json({
                status: 200,
                message: 'Resume Created',
            });
        }

    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error while Calling Resume Api');
    }
}

// get Jober Peticuler Id vicy Show our Resume

const getJResume = async (req, res) => {

    const { joberId } = req.body;

    console.log('req.body',joberId);

    try {
        await JResu.findOne({"joberId": joberId}).then((data) => {
            res.status(200).json({
                // status: 200,
                // message: 'get Jober Resume SuccessFully ',
                data,
            })
        }).catch((e) => {
            console.log('Error :', e.message);
        })

    } catch (error) {
        console.log('Error :', error.message);
        console.log('Error While Calling Perticuler Id show resume');
    }
}

// Update Jober Peticuler Id vicy Show our Resume

const updateResume = async (req, res) => {

    const {id, firstname, lastname, roll, experience, description, email, phoneno, linkedin, location, git, technicalsills, education, projects, languages, hobbies,} = req.body;

    try {
        const obj = {
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
            avatar: req.file ? req.file.filename : null,
        };
        await JResu.updateOne({'joberId': id}, obj).then((data) => {
            res.status(200).json({
                status: 200,
                message: 'Resume Updated',
            })
        }).catch((error) => {
            console.log(error.message);
            res.send('error');
        })


    } catch (error) {
        console.log('Error :', error.message);
        console.log('Error while Calling Resume Update Api')
    }
}

module.exports = {JResume, getJResume, updateResume};
