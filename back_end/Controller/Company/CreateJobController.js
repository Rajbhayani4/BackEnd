const CreateJob = require('../../Models/Company/CreateJobeSchema');
const mongoose = require('mongoose');

const CCreateJob = async (req, res) => {

    const {companyId, title, leavel, description, vacancy, jobtime, salary, location} = req.body;

    try {
        let CreateJobe;
        CreateJobe = new CreateJob({
            companyId,
            title,
            leavel,
            description,
            vacancy,
            jobtime,
            salary,
            location
        })
        await CreateJobe.save();
        res.status(200).json({
            status: 200,
            message: ' Job Create SuccessFully ',
        });

    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error While hiting Cerate Job Api In back_end')
    }
}


// Get All Jobs
const getAllJobs = async (req, res) => {
    try {

        await CreateJob.aggregate([
            {
                $lookup: {
                    from: "companymods",
                    localField: "companyId",
                    foreignField: "_id",
                    pipeline: [
                        {$project: {_id: 0, password: 0}}
                    ],
                    as: "company_details"
                }
            },
            {$project: {companyId: 0,}}
        ]).then((data) => {
            res.status(200).json({
                // status: 200,
                // message: 'Get all Jobs SuccessFully ',
                data
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })

    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error While hiting Get all Jobs Api In BackEnd');
    }
}

// get Jober Details By Id
const getJobById = async (req, res) => {
    const {id} = req.params
    try {
        // await CreateJob.findById(id).then((data) => {
        //     // console.log(data);
        //     res.status(200).json({
        //         // status: 200,
        //         // message: 'Get Jobs Details SuccessFully',
        //         data,
        //     });
        // }).catch((e) => {
        //     console.log('Error :', e.message);
        // })
        await CreateJob.aggregate([
            { $match : {_id: mongoose.Types.ObjectId(id)} },
            {
                $lookup : {
                    from: 'companymods',
                    localField: 'companyId',
                    foreignField: '_id',
                    pipeline: [{ $project: {
                        _id: 0, password: 0, username: 0
                        } }],

                    as :'companyDetails'
                }
            }
        ]).then((data) => {
            res.status(200).json({
                data
            })
        })
            .catch((e) => {
                console.log(e.message);
            })


    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error While hiting Get all Jobs Api In BackEnd');
    }

}

// get Company Peticuler Id vicy Show Our Jobs

const getCJob = async (req, res) => {

    const {companyId} = req.body

    try {
        await CreateJob.find({companyId}).then((data) => {
            res.status(200).json({
                // status: 200,
                // message: ' Job Create SuccessFully ',
                data
            });
        }).catch((e) => {
            console.log('Error :', e.message);
        })

    } catch (error) {
        console.log('Error : ', error.message);
        console.log('Error While hiting get Job Api In back_end');
    }
}

const updateJob = async (req, res) => {

    const {id, title, leavel, description, vacancy, jobtime, salary, location} = req.body;
    try {
        const Obj = {
            title,
            leavel,
            description,
            vacancy,
            jobtime,
            salary,
            location
        }
        await CreateJob.updateOne({'_id': id}, Obj).then((data) => {
            res.status(200).json({
                status: 200,
                message: 'Job Updated'
            })
        })

    } catch (error) {
        console.log('Error :', error.message);
        console.log('Error While heting Job Update Api');
    }

}

const deleteJob = async (req, res) => {

    const {id} = req.body;

    try {
        await CreateJob.remove({'_id': id}).then((data) => {
            res.status(200).json({
                status: 200,
                message: 'Job Was Deleted'
            })
        })

    } catch (error) {
        console.log('Error :', error.message);
        console.log('Error While heating Job Delte Api');
    }
}


module.exports = {CCreateJob, getAllJobs, getJobById, getCJob, updateJob, deleteJob}
