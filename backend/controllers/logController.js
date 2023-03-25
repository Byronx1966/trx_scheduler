const Log = require("../models/Log");

exports.getLogsByTaskId = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const logs = await Log.findAll({ where: { taskId: taskId } });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs: " + error });
  }
};
