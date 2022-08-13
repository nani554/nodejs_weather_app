const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: String,
    description: String,
    author: String
})

const dailyTask = mongoose.model("task", taskSchema);
module.exports = dailyTask;