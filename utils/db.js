import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as scheme from "./schema"
const sql = neon(process.env.DATABASE_URL);
 export const db = drizzle(sql,{schema});
