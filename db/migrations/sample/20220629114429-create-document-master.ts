/**
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: create document file
 * @returns: document table
 */
'use strict';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable('document', {
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
      file_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      file_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      file_key: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      return Promise.all([queryInterface.dropTable('document')]);
    });
  },
};
