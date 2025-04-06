import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    externalId: v.string(),
  })
    .index("byExternalId", ["externalId"])
    .index("byUsername", ["username"]),
  cart: defineTable({
    userId: v.string(),
    asin: v.string(),
    name: v.string(),
    img: v.string(),
    price: v.float64(),
    amount: v.number(),
    totalPrice: v.float64(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_asin", ["asin"]),
  wishlist: defineTable({
    userId: v.string(),
    price: v.float64(),
    name: v.string(),
    img: v.string(),
    asin: v.string(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_asin", ["asin"]),
});
