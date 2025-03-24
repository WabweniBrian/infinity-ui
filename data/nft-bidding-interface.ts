export interface BidHistoryItem {
  id: string;
  bidder: {
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  amount: string;
  timestamp: Date;
}

// Sample data for Bidding Interface
export const bidHistoryData: BidHistoryItem[] = [
  {
    id: "1",
    bidder: {
      username: "cryptowhale",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      isVerified: true,
    },
    amount: "2.7",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    bidder: {
      username: "nftcollector",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    amount: "2.5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    bidder: {
      username: "artlover",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    amount: "2.2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "4",
    bidder: {
      username: "digitalinvestor",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      isVerified: true,
    },
    amount: "2.0",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];
