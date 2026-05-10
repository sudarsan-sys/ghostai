import { Liveblocks } from "@liveblocks/node";

const secret = process.env.LIVEBLOCKS_SECRET_KEY;

/**
 * Cached Liveblocks node client
 */
export const liveblocks = new Liveblocks({
  secret: (secret || "sk_dummy_for_build").trim(),
});

/**
 * Deterministic color palette for user cursors
 */
const CURSOR_COLORS = [
  "#FF5733", // Orange-Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#F333FF", // Pink/Purple
  "#33FFF3", // Cyan
  "#FFBD33", // Yellow-Orange
  "#8D33FF", // Deep Purple
  "#FF338D", // Hot Pink
  "#33FFBD", // Mint
  "#FF8D33", // Tangerine
];

/**
 * Deterministically maps a user ID to a consistent color from a fixed palette.
 */
export function getUserColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CURSOR_COLORS.length;
  return CURSOR_COLORS[index];
}
