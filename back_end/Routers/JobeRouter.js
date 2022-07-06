const express = require('express');
const { JSignin, JLogin, getJoberProdile, getAllUser, updateJoberProfileByAdmin } = require("../Controller/Jober/JoberController");
const { JResume, getJResume, updateResume } = require('../Controller/Jober/JResumeController');
const upload = require('../middleware/upload');
const router = express.Router();
const {authJober, authAdmin} = require("../middleware/authToken");

// Sign in Api            upload.single('avatar'),
router.post('/Signin',upload.single('avatar'),  JSignin);

// Login Api
router.post('/Login', JLogin);

// Create Resume Api
router.post('/resume',authJober, upload.single('avatar'), JResume);

// get resume by Jober id
router.post('/getjresume',authJober, getJResume);

// resume Update
router.put('/updateresume', authJober, upload.single('avatar'), updateResume);

//get JoberProfile
router.post('/joberprofile',authJober, getJoberProdile);


// Admin
router.get('/alluser',authAdmin, getAllUser)

// Admin update
router.put('/joberprofileupdate',updateJoberProfileByAdmin)


module.exports = router;
