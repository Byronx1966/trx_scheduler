module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "Task",
        {
            fromAddress: DataTypes.STRING,
            toAddress: DataTypes.STRING,
            amount: DataTypes.DECIMAL,
            interval: DataTypes.INTEGER,
        },
        {}
    );
    Task.associate = function (models) {
        Task.hasMany(models.Log, {
            foreignKey: "taskId",
            as: "logs",
        });
    };
    return Task;
};
