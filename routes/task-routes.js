const router = require("express").Router();
const { getAllTasks, createTask, updateTask, deleteTask } = require("../controller/task-controller.js");

router.get("/getAll", getAllTasks)

router.post("/create", createTask)

router.post("/update", updateTask)

router.get("/delete/:name", deleteTask)

module.exports = router;