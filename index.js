const express = require('express')
const mongoose = require('mongoose')
const logger = require('./middleware/logger')

require('dotenv').config();

const app = express();


// Init Middlewares
// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(logger);

app.get('/', (req, res) => res.send("Hello World"))
app.use('/api/employees', require('./routes/api.employee'))
// ENV
// const dbConn = 'mongodb+srv://Kunal:kunal@cluster0.hvghisd.mongodb.net/company';
const dbConn = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_CLUSTER}.hvghisd.mongodb.net/${process.env.MONGO_DB_DB}`
const PORT = process.env.PORT || 5000;

// Creating Connection
mongoose.connect(dbConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Check Connections
mongoose.connection.on('error', err => console.log("Databse Connection Error"))
mongoose.connection.on('connected', (err,res) => console.log("Database Connected"))

// Making Servers
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))