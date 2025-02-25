/**
 * @auther: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: create reset password url file
 * @returns: reset password url table
 */
'use strict';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable('reset_password_url', {
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reset_password_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expire_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_called: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.dropTable('reset_password_url');
  },
};
