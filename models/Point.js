"use strict";

module.exports = function(sequelize, DataTypes) {
  const Point = sequelize.define("Point", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    x: {
	type: DataTypes.FLOAT(32),
	allowNull: false,
    },
    y: {
	type: DataTypes.FLOAT(32),
	allowNull: false,
      
    }
  } );
  return Point;
};
