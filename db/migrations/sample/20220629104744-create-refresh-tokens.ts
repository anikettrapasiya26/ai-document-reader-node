/**
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: create refresh token file
 * @returns: refresh token table
 */
'use strict';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable('refresh_tokens', {
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
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expired_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('refresh_tokens');
  },
};
