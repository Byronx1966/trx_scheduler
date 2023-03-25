const { TrxTask, TrxLog } = require('./models');
const schedule = require('node-schedule');

const taskMap = new Map();

const startTask = async (task) => {
    const { id, interval_minutes } = task;

    // 在这里编写交易执行逻辑
    const executeTrx = async () => {
        console.log(`执行交易任务：${task.name}`);
        // 在这里编写交易执行逻辑

        // 将日志记录到数据库
        await TrxLog.create({
            task_id: task.id,
            message: `执行交易任务：${task.name}`,
        });
    };

    // 使用 node-schedule 设置定时任务
    const job = schedule.scheduleJob(`*/${interval_minutes} * * * *`, executeTrx);
    taskMap.set(id, job);
};

const stopTask = async (taskId) => {
    const job = taskMap.get(taskId);
    if (job) {
        job.cancel();
        taskMap.delete(taskId);
    }
};

const loadTasksFromDb = async () => {
    const tasks = await TrxTask.findAll({ where: { enabled: true } });
    tasks.forEach((task) => startTask(task));
};

// 添加计划任务
const addScheduledTask = async (task) => {
    const job = schedule.scheduleJob(
        `*/${task.interval} * * * * *`,
        async function () {
            // 在这里执行交易任务
            // ...执行交易...

            // 记录交易日志
            const log = await Log.create({
                taskId: task.id,
                message: "交易已执行",
                type: "transaction",
            });

            // 将日志发送给所有连接的客户端
            io.emit("log", log);
        }
    );

    // 将计划任务添加到任务列表
    taskList.push({ task, job });
}

module.exports = {
    startTask,
    stopTask,
    loadTasksFromDb,
    addScheduledTask
};

