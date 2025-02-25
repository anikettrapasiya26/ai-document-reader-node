/**
 * @auther: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: create role permission file
 * @returns: role permission table
 */
'use strict';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable('role_permissions', {
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
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['include', 'exclude'],
        defaultValue: 'include',
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
      given_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      given_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      invoke_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      invoke_at: {
        type: DataTypes.DATE,
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
  down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('role_permissions'),
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_role_permissions_type";',
        ),
      ]);
    });
  },
};
