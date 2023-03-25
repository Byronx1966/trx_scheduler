const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const { startTask, stopTask, addScheduledTask } = require('../scheduler');

// 获取任务列表
router.get("/", async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// 创建新任务
router.post("/", async (req, res) => {
    const task = await Task.create(req.body);
    await addScheduledTask(task);
    res.status(201).json(task);
});

// 启动任务
router.post("/:id/start", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        res.status(404).json({ error: "Task not found" });
    } else {
        const index = taskList.findIndex((t) => t.task.id === task.id);
        if (index !== -1) {
            taskList[index].job.reschedule(`*/${task.interval} * * * * *`);
        } else {
            await addScheduledTask(task);
        }
        res.status(200).json({ success: true });
    }
});

// 停止任务
router.post("/:id/stop", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        res.status(404).json({ error: "Task not found" });
    } else {
        const index = taskList.findIndex((t) => t.task.id === task.id);
        if (index !== -1) {
            taskList[index].job.cancel();
            taskList.splice(index, 1);
        }
        res.status(200).json({ success: true });
    }
});

module.exports = router;