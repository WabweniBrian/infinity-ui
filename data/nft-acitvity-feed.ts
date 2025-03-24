export type ActivityType =
  | "sale"
  | "listing"
  | "offer"
  | "transfer"
  | "mint"
  | "all";

export interface ActivityItem {
  id: string;
  type: Exclude<ActivityType, "all">;
  nftName: string;
  nftImage: string;
  collectionName: string;
  collectionImage: string;
  from: {
    username: string;
    avatar: string;
  };
  to?: {
    username: string;
    avatar: string;
  };
  price?: string;
  timestamp: Date;
}

export const activityData: ActivityItem[] = [
  {
    id: "1",
    type: "sale",
    nftName: "Cosmic Voyager #042",
    nftImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    collectionName: "Cosmic Series",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    from: {
      username: "stellarartist",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    to: {
      username: "cryptowhale",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    price: "2.5",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    type: "listing",
    nftName: "Digital Dreamscape",
    nftImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    collectionName: "Dream Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    from: {
      username: "pixelmaster",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    price: "1.8",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    type: "mint",
    nftName: "Abstract Dimensions #023",
    nftImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    collectionName: "Abstract Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    from: {
      username: "cryptoartist",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "4",
    type: "transfer",
    nftName: "Future Relic #007",
    nftImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    collectionName: "Future Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    from: {
      username: "neodesigner",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    to: {
      username: "artcollector",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "5",
    type: "offer",
    nftName: "Neon Genesis #015",
    nftImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    collectionName: "Neon Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    from: {
      username: "cryptowhale",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    price: "3.2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  },
];
