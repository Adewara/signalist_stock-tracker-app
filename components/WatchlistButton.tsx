"use client";

import React from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface WatchlistButtonProps {
  symbol: string;
  company: string;
  isInWatchlist: boolean;

  // Optional prop for a callback when watchlist status changes
  onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  symbol,
  company,
  isInWatchlist,
  onWatchlistChange,
}) => {
  const handleToggleWatchlist = () => {
    // Placeholder for actual API call to add/remove from watchlist
    console.log(
      `Toggling watchlist for ${company} (${symbol}). Current status: ${isInWatchlist}`,
    );
    // Simulate API call success/failure
    const newStatus = !isInWatchlist;
    if (onWatchlistChange) {
      onWatchlistChange(symbol, newStatus);
    }
    // In a real app, you'd trigger a state update or re-fetch here
    alert(`Watchlist status for ${symbol} changed to: ${newStatus}`);
  };

  return (
    <Button
      onClick={handleToggleWatchlist}
      variant={isInWatchlist ? "secondary" : "default"}
      className="w-full justify-center"
    >
      <Star
        className={`mr-2 h-4 w-4 ${
          isInWatchlist ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
      {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </Button>
  );
};
