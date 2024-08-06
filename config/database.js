const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    postgres: {
      connection: {
        connectionString: env(process.env.DATABASE_CONNECTIONSTRING),
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", process.env.DATABASE_PORT),
        database: env("DATABASE_NAME", process.env.DATABASE_NAME),
        user: env("DATABASE_USERNAME", process.env.DATABASE_USERNAME),
        password: env("DATABASE_PASSWORD", process.env.DATABASE_PASSWORD),
        // ssl: env.bool("DATABASE_SSL", false) && {
        //   key: env("DATABASE_SSL_KEY", undefined),
        //   cert: env("DATABASE_SSL_CERT", undefined),
        //   ca: env("DATABASE_SSL_CA", undefined),
        //   capath: env("DATABASE_SSL_CAPATH", undefined),
        //   cipher: env("DATABASE_SSL_CIPHER", undefined),
        //   rejectUnauthorized: env.bool(
        //     "DATABASE_SSL_REJECT_UNAUTHORIZED",
        //     true,
        //   ),
        // },
        ssl: {
          require: true,
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
