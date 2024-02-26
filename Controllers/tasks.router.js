const express = require("express");
const { TaskModel } = require("../Model/Tasks.Model");
const taskRouter = express.Router();
const { auth } = require("../Middlewares/Auth.middleware");
taskRouter.use(auth);

/**
 * @swagger
 * components:
 *   schemas:
 *     task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *           description: Title of the task
 *         body:
 *           type: string
 *           description: Description of the task
 *         userId:
 *           type: string
 *           description: The Id of the user who created the task
 *         username:
 *           type: string
 *           description: The name of the user who created the task
 */
/**
 * @swagger
 * tags:
 *   name: task
 *   description: All the API routes related to tasks
 */
/**
 * @swagger
 * /task:
 *   get:
 *     summary: This will get all the tasks from the database
 *     tags:
 *       - task
 *     responses:
 *       200:
 *         description: Will get all the tasks from the database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               item:
 *                 $ref: "#/components/schemas/task"
 */

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    let userId = req.userId;
    let username = req.username;
    res.status(200).send({ msg: "All tasks", data: tasks });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});
/**
 * @swagger
 * /task/add:
 *   post:
 *     summary: This will create a new task in the database
 *     tags:
 *       - task
 *     requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/task"
 *     responses:
 *       200:
 *         description: Will create a new task in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item:
 *                 $ref: "#/components/schemas/task"
 */
taskRouter.post("/add", async (req, res) => {
  try {
    let userId = req.userId;
    let username = req.username;
    const task = new TaskModel({ ...req.body, userId, username });
    await task.save();
    res.status(200).send({ msg: "task added successfully" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

taskRouter.patch("/update/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const userId = req.userId;
    const task = await TaskModel.findOne({ _id: task_id });
    if (task.userId === userId) {
      await TaskModel.findByIdAndUpdate({ _id: task_id }, req.body);
      res.status(200).send({ msg: "task updated successfully" });
    } else {
      res
        .status(200)
        .send({ msg: `You are not authorized to update this task` });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});
taskRouter.delete("/delete/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const userId = req.userId;
    const task = await TaskModel.findOne({ _id: task_id });
    if (userId === task.userId) {
      await TaskModel.findByIdAndDelete({ _id: task_id });
      res.status(200).send({ msg: "task deleted successfully" });
    } else {
      res
        .status(200)
        .send({ msg: `You are not authorized to delete this task` });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = { taskRouter };
