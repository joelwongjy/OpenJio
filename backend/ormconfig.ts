import { ConnectionOptions } from "typeorm";

switch (process.env.NODE_ENV) {
  case "development":
    require("dotenv").config({ path: ".env.development" });
    break;
  case "test":
    require("dotenv").config({ path: ".env.test" });
    break;
}

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_NAME,
  POSTGRES_DISABLE_SSL,
} = process.env;

if (
  !POSTGRES_USERNAME ||
  !POSTGRES_PASSWORD ||
  !POSTGRES_HOST ||
  !POSTGRES_PORT ||
  !POSTGRES_NAME
) {
  console.log(process.env.NODE_ENV);
  throw new Error("Missing database config!");
}

export const postgres: ConnectionOptions = {
  type: "postgres",
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_NAME,
  ssl: !POSTGRES_DISABLE_SSL,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/src/entities/**/*.js`, "src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [
    `${__dirname}/src/subscribers/**/*.js`,
    "src/subscribers/**/*.ts",
  ],
  cli: {
    entitiesDir: `src/entities`,
    migrationsDir: `src/migrations`,
    subscribersDir: `src/subscribers`,
  },
  migrationsRun: true,
};

module.exports = postgres;
