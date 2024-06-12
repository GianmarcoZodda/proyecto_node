const PORT = process.env.PORT || 3306;
const DB_NAME = process.env.DB_NAME || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DIALECT = process.env.DB_DIALECT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const SECRET = process.env.SECRET;


export {
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  SECRET
};
