const express = require('express');
const router = express.Router();
const {authAdmin} = require("../middleware/authToken");
const {adminLogin} = require("../Controller/Admin/AdminController");

router.post('/adminlogin', adminLogin);


module.exports = router;
