import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  json,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// Users table for admin authentication
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Sessions table for Lucia auth
export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Services table
export const services = mysqlTable("services", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description").notNull(),
  price: varchar("price", { length: 100 }).notNull(),
  image: varchar("image", { length: 500 }),
  features: json("features").$type<string[]>().notNull(),
  examples: json("examples")
    .$type<
      Array<{
        title: string;
        description: string;
        image: string;
      }>
    >()
    .notNull(),
  process: json("process").$type<string[]>().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Portfolio items
export const portfolioItems = mysqlTable("portfolio_items", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  client: varchar("client", { length: 255 }),
  url: varchar("url", { length: 500 }),
  image: varchar("image", { length: 500 }),
  images: json("images").$type<string[]>(),
  technologies: json("technologies").$type<string[]>(),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  order: int("order").notNull().default(0),
  year: varchar("year", { length: 4 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Pages content management
export const pages = mysqlTable("pages", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: json("content").$type<any>().notNull(),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Media files
export const mediaFiles = mysqlTable("media_files", {
  id: int("id").primaryKey().autoincrement(),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  size: int("size").notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  folder: varchar("folder", { length: 255 }).default(""),
  uploadedBy: varchar("uploaded_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Team members
export const teamMembers = mysqlTable("team_members", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 500 }),
  skills: json("skills").$type<string[]>().notNull(),
  social: json("social")
    .$type<{
      github?: string;
      linkedin?: string;
      email?: string;
      telegram?: string;
    }>()
    .notNull(),
  order: int("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// Reviews
export const reviews = mysqlTable("reviews", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 500 }),
  rating: int("rating").notNull().default(5),
  text: text("text").notNull(),
  project: varchar("project", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Blog posts
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: varchar("image", { length: 500 }),
  category: varchar("category", { length: 100 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  readTime: varchar("read_time", { length: 50 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// FAQ items
export const faqItems = mysqlTable("faq_items", {
  id: int("id").primaryKey().autoincrement(),
  question: varchar("question", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  order: int("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// Cases
export const cases = mysqlTable("cases", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  client: varchar("client", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: json("results")
    .$type<
      Array<{
        metric: string;
        value: string;
      }>
    >()
    .notNull(),
  image: varchar("image", { length: 500 }),
  timeline: varchar("timeline", { length: 100 }).notNull(),
  technologies: json("technologies").$type<string[]>().notNull(),
  order: int("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Careers/Jobs
export const jobs = mysqlTable("jobs", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  salary: varchar("salary", { length: 100 }).notNull(),
  description: text("description").notNull(),
  requirements: json("requirements").$type<string[]>().notNull(),
  skills: json("skills").$type<string[]>().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Site settings
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").primaryKey().autoincrement(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: json("value").$type<any>().notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  mediaFiles: many(mediaFiles),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const mediaFilesRelations = relations(mediaFiles, ({ one }) => ({
  uploader: one(users, {
    fields: [mediaFiles.uploadedBy],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type MediaFile = typeof mediaFiles.$inferSelect;
export type NewMediaFile = typeof mediaFiles.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type FaqItem = typeof faqItems.$inferSelect;
export type NewFaqItem = typeof faqItems.$inferInsert;
export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;
