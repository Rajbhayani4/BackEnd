const express = require('express');
const {AdminToken} = require("../../middleware/GenerateJWTToken");
const AdminModel = require('../../Models/Admin/AdminSchema')

// Company Login
const adminLogin = async (req, res) => {

    const {username, email, password} = req.body;

// Compare uername and email id
    const userData = await AdminModel.findOne({$or: [{username}, {email: username}]});

    if (userData) {
        const token = AdminToken(userData._id);
        return res.status(200).json({
            id: userData._id,
            token,
        });
    }
    else {
        return res.status(401).json({
            status: 401,
            message: 'user not found',
        });
    }
}

module.exports = { adminLogin }
