'use server'

import { connectToDatabase } from "@/database/mongoose";
import Watchlist from "@/database/models/watchlist.model";

/**
 * Fetches the watchlist symbols for a user identified by their email.
 * @param email The user's email address.
 * @returns A promise that resolves to an array of stock symbols.
 */

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection not established");
    }

    // Find the user by email in the user collection (Better Auth)
    const user = await db.collection("user").findOne({ email });

    if (!user) {
      return [];
    }

    // Better Auth users typically use 'id' as the primary identifier
    const userId = user.id || user._id.toString();
    if (!userId) return [];

    // Query the Watchlist collection by userId
    const watchlistItems = await Watchlist.find({ userId });

    // Return only the symbols
    return watchlistItems.map((item) => String(item.symbol));
  } catch (error) {
    console.error(`Error in getWatchlistSymbolsByEmail for ${email}:`, error);
    return [];
  }
}
