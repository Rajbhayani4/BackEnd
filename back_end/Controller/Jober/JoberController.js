const express = require('express');
const bcrypt = require('bcryptjs');
const JobMod = require('../../Models/Jober/JoberSchema');
const {JgenreteToken} = require('../../middleware/GenerateJWTToken') // Token import

const JSignin = async (req, res) => {
    const {username, surname, education, work, experience, email, password} = req.body;
    // console.log(username, surname, education, work, experience, email, password);
    try {
        const exist = await JobMod.findOne({username});
        const existEmail = await JobMod.findOne({email});

        if (exist) {
            return res.status(401).json('Username Id is allready exist');
        } else if (existEmail) {
            return res.status(401).json('Email Id is allready exist');
        } else {
            // Create Hash Password
            const hashpassword = await bcrypt.hash(password, 10);
            let newJober;
            newJober = new JobMod({
                username,
                surname,
                education,
                work,
                experience,
                email,
                password: hashpassword,
                avatar: req.file ? req.file.filename : null,
            });

            await newJober.save();
            res.status(200).json({
                status: 200,
                message: 'User is SuccessFully registered',

            });
        }
    } catch (error) {
        console.log('Error : ', error.message);
        console.log('******************************');
    }
}

// Login User Controller

const JLogin = async (req, res) => {

    const {username, password} = req.body;

    try {
        const userData = await JobMod.findOne({$or: [{username}, {email: username}]})

        if (userData) {
            // compare body password and bcrypt password
            const isPasswordCorrect = await bcrypt.compare(password, userData.password)

            if (isPasswordCorrect) {
                const token = JgenreteToken(userData._id)
                return res.status(200).json({
                    status: 200,
                    message: `${username} Login SuccessFull`,
                    id: userData._id,
                    username: userData.username,
                    surname: userData.surname,
                    education: userData.education,
                    work: userData.work,
                    experience: userData.experience,
                    email: userData.email,
                    avatar: userData.avatar,
                    token, // Token Send

                });
            } else {
                return res.status(401).json({
                    status: 401,
                    message: 'invalid password',
                });
            }

        } else {
            return res.status(401).json({
                status: 401,
                message: 'user not found',
            });
        }

    } catch (error) {
        console.log('Error :', error.message);
    }

}

// get Jober Prodile Details
const getJoberProdile = async (req, res) => {
    const {id} = req.body

    try {
        await JobMod.findById(id).then((data) => {
            res.status(200).json({
                // status: 200,
                data,
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })

    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error While hiting Get Jober Profile Api In BackEnd');
    }

}

const getAllUser = async (req, res) => {
    try {
        await JobMod.find().then((data) => {
            res.status(200).json({
                status: 200,
                // data,
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })

    } catch (error) {
        console.log('Error : ', error.message);
    }
}

const updateJoberProfileByAdmin = async (req, res) => {
    const {id, username, surname, education, work, experience, email, password} = req.body;
    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const Obj = {
            username,
            surname,
            education,
            work,
            experience,
            email,
            password: hashpassword,
        };
        await JobMod.updateOne({'_id': id}, Obj).then((data) => {
            res.status(200).json({
                // message: 'User Was',
                status: 200,
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })
    } catch (error) {
        console.log('Error : ', error.message);
    }
}

module.exports = {JSignin, JLogin, getJoberProdile, getAllUser, updateJoberProfileByAdmin};
