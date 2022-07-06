const jwt = require('jsonwebtoken');

// Genrete Token For Jober
const JgenreteToken = (_id, username, email, experience) => {
    return jwt.sign({_id, username, email, experience }, process.env.JJWT_SECRET);
}

// Genrete Token For Company
const CgenreteToken = (_id, username, companyName, email, work) => {
    return jwt.sign({_id, username, companyName, email, work }, process.env.CJWT_SECRET);
}

// Genrete Token For Admin
const AdminToken = (_id, username) => {
    return jwt.sign({_id, username }, process.env.Admin_SECRET);
}

module.exports = { JgenreteToken, CgenreteToken, AdminToken };

