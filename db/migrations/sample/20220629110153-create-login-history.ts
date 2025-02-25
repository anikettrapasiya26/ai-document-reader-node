/**
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: create login history file
 * @returns: login history table
 */
'use strict';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable('login_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      login_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      device: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      device_type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      device_token_android: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      device_token_ios: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      device_token_web: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable('login_histories');
  },
};
