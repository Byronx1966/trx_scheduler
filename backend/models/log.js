module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define(
        "Log",
        {
            taskId: DataTypes.INTEGER,
            message: DataTypes.STRING,
            type: DataTypes.ENUM("transaction", "schedule"),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            startTime: DataTypes.DATE,
            endTime: DataTypes.DATE,
            completed: DataTypes.BOOLEAN,
        },
        {}
    );
    Log.associate = function (models) {
        Log.belongsTo(models.Task, {
            foreignKey: "taskId",
            as: "task",
        });
    };
    return Log;
};

