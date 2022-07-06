require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const port = process.env.PORT;
const connection = require('./DataBase/db');
const JobRouter = require('./Routers/JobeRouter');
const CompanyRouter = require('./Routers/CompanyRouter');
const AdminRoutes = require('./Routers/AdminRoutes');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(cors());

app.all('/', (req, res) => {
	return res.json({
		status: true,
		message: 'Server is Working .....'
	})
});
app.use('/Job', JobRouter);
app.use('/company', CompanyRouter);
app.use('/admin', AdminRoutes);


connection();

app.listen(port, ()=> {console.log(`App is Working On ${port} PORT`)});

