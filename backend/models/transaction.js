const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // 与Task模型关联
      Transaction.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task',
      });
    }
  }

  Transaction.init(
    {
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(18, 8),
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      txID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      blockHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );

  return Transaction;
};
