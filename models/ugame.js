"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ugame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ugame.hasOne(models.ugamebio, {
        foreignKey: "userGameId",
        as: "ugamebio",
      });
    }
  }
  ugame.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ugame",
    }
  );
  return ugame;
};
