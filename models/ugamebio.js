"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ugamebio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ugamebio.belongsTo(models.ugame, {
        foreignKey: "userGameId",
        as: "ugame",
      });
    }
  }
  ugamebio.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      userGameId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ugamebio",
    }
  );
  return ugamebio;
};
