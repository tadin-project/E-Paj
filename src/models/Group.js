const Sequelize = require("sequelize");
const { dbConn } = require("../config/config");

const { DataTypes } = Sequelize;

const Group = dbConn.define(
  "Group",
  {
    group_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group_kode: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    group_nama: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    group_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "ms_group",
  }
);

module.exports = Group;

// (() => {
//   Group.sync();
// })();
