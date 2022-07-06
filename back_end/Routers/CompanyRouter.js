const express = require('express');
const router = express.Router();
const { CSignUp, CLogin, allCompanys, updateProfileAdmin, DeleteProfileAdmin } = require('../Controller/Company/CompanyController');
const {CCreateJob, getAllJobs, getJobById, getCJob, updateJob, deleteJob } = require("../Controller/Company/CreateJobController");
const upload = require('../middleware/upload')
const {ReciveResume, applyedResumeList, getJoberResume, ChangeStatus} =  require("../Controller/Company/ResumeReciveController");
const {authCompany, authJober, authAdmin } = require("../middleware/authToken")

// Comapny Sign  upload.single('avatar'),
router.post('/csignup',upload.single('avatar'), CSignUp);

// Company Login
router.post('/clogin', CLogin);

// Create Job
router.post('/createjob',authCompany, CCreateJob);

// Jet All Jobs Jober
router.get('/getalljobs',authJober, getAllJobs);

// Jet All Jobs Company
router.get('/cgetalljobs',authCompany, getAllJobs);

// Jet All Jobs Admin
router.get('/admingetalljobs',authAdmin, getAllJobs);

// Get Job By Id
router.get('/getjob/:id',authJober, getJobById);

// get Job by Company id
router.post('/getcjob',authCompany, getCJob);

// Job Updated by Company
router.put('/update',authCompany, updateJob);

// Job Delete By Company
router.post('/delete',authCompany, deleteJob);

// Comapny Recive Jober Resume
// upload.single('avatar'),
router.post('/sendresume',authJober, ReciveResume);

// get Applyed Resume List get Jober
router.post('/applyedresumelist', authJober, applyedResumeList)

// get Seneded resume
router.post('/cjgetresume', getJoberResume)

// Comapny update Recived Jober Resume
router.put('/updatestatus', ChangeStatus);


// Admin
router.get('/allCompanys',authAdmin, allCompanys);

// Job Updated by Admin
router.put('/adminupdate',authAdmin, updateJob);

// Job Delete By Admin
router.post('/admindelete',authAdmin, deleteJob);

//Change Company Profile By Admin
router.put('/updateProfileAdmin',upload.single('avatar'), authAdmin, updateProfileAdmin);

// Delete Company Profile By Admin
router.post('/adminCompanydelete',authAdmin, DeleteProfileAdmin);

module.exports = router;
