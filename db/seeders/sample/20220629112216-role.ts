/**
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Seeder patient file
 * @returns: Add rows in patient table
 */
'use strict';

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('role', [
      {
        name: 'super admin',
        description: 'super admin',
      },
      {
        name: 'client',
        description: 'client',
      },
    ]);
  },
};
