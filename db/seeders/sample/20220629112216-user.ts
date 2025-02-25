/**
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Seeder patient file
 * @returns: Add rows in patient table
 */
'use strict';

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('user', [
      {
        role_id: 1,
        name: 'Akshay',
        email: 'akshay@dataprophets.in',
        phone: '9898989898',
        password:
          '$2a$10$Aak8anMrdcTMXS6XnhU5x.03/OAr6PIbrKD.C9iuzdX.L6cY9vlK.',
      },
      {
        role_id: 1,
        name: 'Ketan',
        email: 'ketan@dataprophets.in',
        phone: '7256853189',
        password:
          '$2a$10$0UTIrKfocsZTtks1NYP2POlw04hqDJxisn.sgcnN6h/f6e7sJwv0m',
      },
      {
        role_id: 2,
        name: 'Nauman',
        email: 'nauman.pathan@dataprophets.in',
        phone: '7226883189',
        password:
          '$2a$10$61kOvkSs6uuobiFoCmnjBOT4JnlYuJwg8Wifz3SZMD/AG.O20we8K',
      },
      {
        role_id: 2,
        name: 'Burhan',
        email: 'burhan.lakdawala@dataprophets.in',
        phone: '7226853189',
        password:
          '$2a$10$EGFk3LD1ruwPNhC2EoqZiOO9jIyc5afsYs6ceKXV9keWjU6LYYnCa',
      },
    ]);
  },
};
