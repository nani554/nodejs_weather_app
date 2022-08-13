const mongoose = require("mongoose");

const mongooseOptions = {

}

function connectDB() {
    mongoose.connect(process.env.DBCONNECTION, (error) => {
        if (!error) {
            console.log('successfully connected to database');
        }
    });
}


module.exports = connectDB;