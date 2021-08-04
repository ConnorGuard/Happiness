// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'happiness',
      user:'root',
      password:'Cab230!'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'happiness',
      user:     'root',
      password: 'Cab230!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'happiness',
      user:     'root',
      password: 'Cab230!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
