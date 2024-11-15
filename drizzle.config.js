// drizzle.config.js
/** @type {import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js", // Adjust path as necessary
    dialect: "postgresql", // Specify PostgreSQL as the database
    dbCredentials: {
      url: 'postgresql://ai%20interviewmock_owner:0HGMz3kicvfe@ep-nameless-salad-a5oswwxo.us-east-2.aws.neon.tech/ai%20interviewmock?sslmode=require',
    },
  };
  