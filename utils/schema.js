import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", 255).notNull(), // Add length for varchar
  jobDesc: varchar("jobDesc", 255).notNull(),
  jobExperience: varchar("jobExperience", 255).notNull(),
  createdBy: varchar("createdBy", 255).notNull(),
  createdAt: varchar("createdAt", 255).notNull(),
  mockId: varchar("mockId", 255).notNull(),
});
