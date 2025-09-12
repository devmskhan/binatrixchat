import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user by their Clerk userId
export const getUserByClerkId = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_UserId", (q) => q.eq("userId", userId))
      .first();
  },
});

// Create or update user(sync from Clerk)
export const upsertUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),  
    imageUrl: v.string(),
  },
  handler: async (ctx, { userId, name, email, imageUrl }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_UserId", (q) => q.eq("userId", userId))
      .first();
    if (existingUser) {
      await ctx.db.patch(existingUser._id, { name,imageUrl });
      return existingUser._id;
    }

    return await ctx.db.insert("users", { userId, name, email, imageUrl });
  },
});

// Get all users and filter them name or email containing the search term
export const searchUsers = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, { searchTerm }) => {
    if (!searchTerm.trim()) return [];

    const normalizedSearch = searchTerm.toLowerCase().trim();

    const allUsers = await ctx.db.query("users").collect();

    return allUsers
        .filter(
            (user) =>
                user.name.toLowerCase().includes(normalizedSearch) ||
                user.email.toLowerCase().includes(normalizedSearch)
        )
        .slice(0, 20); // Limit to 20 results
  }
});

    
    
  