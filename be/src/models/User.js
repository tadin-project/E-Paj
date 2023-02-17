const Sequelize = require("sequelize");
const { dbConn } = require("../config/config");
const Group = require("./Group");

const { DataTypes } = Sequelize;

const User = dbConn.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_nama: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    user_email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    user_pass: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    group_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: Group, // 'Actors' would also work
        key: "group_id",
      },
    },
  },
  {
    tableName: "ms_user",
  }
);

module.exports = User;

// (() => {
//   User.sync();
// })();
