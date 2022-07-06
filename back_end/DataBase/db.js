const mongoose = require('mongoose');
const db_url = process.env.DB_URL;

const connection = async () => {
    try{
        await mongoose.connect( db_url, { useNewUrlParser : true, useUnifiedTopology : true, useUnifiedTopology: true },
        console.log('Data base Connected SucessFully')
        );
    }catch(error){
        console.log('Error :', error);
        console.log('DB Connection is Fail');
    }
};

module.exports = connection;