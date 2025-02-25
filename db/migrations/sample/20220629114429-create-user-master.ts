/**
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: create user file
 * @returns: user table
 */
'use strict';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      profile_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      remark: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      is_delete: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      updated_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },
    });
  },
  down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.dropTable('user')]);
    });
  },
};
