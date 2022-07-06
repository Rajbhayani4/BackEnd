const express = require('express');
const CompanyMod = require('../../Models/Company/CompanySchema');
const bcrypt = require('bcryptjs');
const {CgenreteToken} = require("../../middleware/GenerateJWTToken");

// Company SignUp
const CSignUp = async (req, res) => {

    const {companyName, username, work, Salary, email, password} = req.body;
    try {
        const exist = await CompanyMod.findOne({username});
        const existEmail = await CompanyMod.findOne({email});

        // Compare uername and email id
        const userData = await CompanyMod.findOne({$or: [{username}, {email: username}]});

        if (userData) {

            return res.status(401).json('Email Id is allready exist');
        } else {
            // Create HashPassword
            const hashpassword = await bcrypt.hash(password, 10);
            let newComp;
            newComp = new CompanyMod({
                companyName,
                username,
                Salary,
                work,
                email,
                password: hashpassword,
                avatar: req.file ? req.file.filename : null,
            });
            await newComp.save();
            res.status(200).json(' User is SuccessFully registered ');
        }
    } catch (error) {
        console.log('Error : ', error.message);
    }

}

// Company Login

const CLogin = async (req, res) => {

    const {username, email, password} = req.body;

    try {
        // Compare uername and email id
        const userData = await CompanyMod.findOne({$or: [{username}, {email: username}]});

        if (userData) {
            // compare body password and bcrypt password
            const isPasswordCorrect = await bcrypt.compare(password, userData.password)

            if (isPasswordCorrect) {
                const token = CgenreteToken(userData._id)
                return res.status(200).json({
                    status: 200,
                    message: `${username} Login SuccessFull`,
                    id: userData._id,
                    username: userData.username,
                    work: userData.work,
                    email: userData.email,
                    // Token Send
                    token,
                })
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

    } catch
        (error) {
        console.log('Error :', error.message);
    }
}

const allCompanys = async (req, res) => {
    try {
        await CompanyMod.find().then((data) => {
            res.status(200).json({
                status: 200,
                // message: 'Get all Jobs SuccessFully ',
                data
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })
    }catch(error) {
        console.log('Error :',error);
    }
}

// Update Company Profile By Admin

const updateProfileAdmin = async (req, res) => {
    const { id, companyName, username, work, Salary, email, password } = req.body
    try{
        const hashpassword = await bcrypt.hash(password, 10);
        const Obj = {
            companyName,
            username,
            work,
            Salary,
            email,
            password: hashpassword,
            avatar: req.file ? req.file.filename : null,
        }
        await CompanyMod.updateOne({'CompanyId': id}, Obj).then((data) => {
            res.status(200).json({
                status: 200,
                // message: 'Get all Jobs SuccessFully ',
                data
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })
    }catch(error) {
        console.log('Error :',error);
    }
}

const DeleteProfileAdmin = async (req, res) => {
    const { id } = req.body
    try{
        await CompanyMod.deleteOne({'CompanyId': id}).then((data) => {
            res.status(200).json({
                status: 200,
                // message: 'Get all Jobs SuccessFully ',
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })
    }catch(error) {
        console.log('Error :',error);
    }
}


module.exports = {CSignUp, CLogin, allCompanys, updateProfileAdmin, DeleteProfileAdmin}
