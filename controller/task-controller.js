const taskModel = require("../model/task-model");

const getAllTasks = async (req, res, next) => {
    return res.json(await taskModel.find());
}

const createTask = (req, res, next) => {
    const newTask = new taskModel(req.body);
    newTask.save();
    res.json(newTask);
}

const updateTask = (req, res, next) => {
    const { name } = req.body;
    const task = taskModel.find({ name });
    if (!task) {
        res.status(400).json({
            message: "Task Does'nt Exist"
        })
        return;
    }
    taskModel.findOneAndUpdate({ name }, req.body, (err, doc) => {
        if (err) {
            res.status(500).json({ message: "Failed to update task" });
            console.log(err);
            return;
        }
    });
    res.json(req.body);
}

const deleteTask = (req, res, next) => {
    const name = req.params.name;
    const task = taskModel.find({ name });
    if (!task) {
        res.status(400).json({
            message: "Task Does'nt Exist"
        })
        return;
    }
    // const deleteResponse = taskModel.findOneAndDelete({ name });
    taskModel.deleteMany({ name }, {}, (err) => {
        console.log(err);
    })
    res.json({ message: `Deleted ${name} Successfully` })
    return;
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}