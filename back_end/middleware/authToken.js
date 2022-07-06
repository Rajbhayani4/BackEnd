const jwt = require('jsonwebtoken');

// Jober Authantication
const authJober = async (req, res, next) => {
    // console.log(req.headers);
    if(req.headers.authorization){

        const token = await req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JJWT_SECRET, (err, decoded) => {
            if (decoded){
                req._id = decoded._id,
                    req.username = decoded.username,
                    req.email = decoded.email,
                    req.experience = decoded.experience
                next();
            } else if (err) {
                res.json({
                    status:400,
                    message: 'Unauthorized!'
                });
            }
        })
    } else {
        res.json({
            status: 400,
            message: 'Unauthorized!'
        });
    }
}

// Company Authantication
const authCompany = async (req, res, next) => {
    if (req.headers.authorization) {
        // console.log(req.headers);
        const token = await req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.CJWT_SECRET, (err, decoded) => {
            if (decoded) {
                req._id = decoded._id,
                    req.username = decoded.username,
                    req.companyName = decoded.companyName,
                    req.email = decoded.email,
                    req.work = decoded.work
                next();

            } else if (err) {
                res.json({
                    status: 400,
                    message: 'Unauthorized!'
                });
            }
        })
    } else {
        res.json({
            status: 400,
            message: 'Unauthorized!'
        });
    }
}

// Admin Authantication
const authAdmin = async (req, res, next) => {
    if (req.headers.authorization) {
        // console.log(req.headers);
        const token = await req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.ADMIN_SECRET, (err, decoded) => {
            if (decoded) {
                req._id = decoded._id,
                next();

            } else if (err) {
                res.json({
                    status: 400,
                    message: 'Unauthorized!'
                });
            }
        })
    } else {
        res.json({
            status: 400,
            message: 'Unauthorized!'
        });
    }
}

module.exports = { authCompany, authJober, authAdmin,  }
