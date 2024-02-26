const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String },
    status: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const TaskModel = mongoose.model("tasks", taskSchema);

module.exports = { TaskModel };
