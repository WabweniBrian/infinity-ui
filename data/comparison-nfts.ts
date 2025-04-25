export interface NFTData {
  id: string;
  name: string;
  image: string;
  collection: string;
  collectionImage: string;
  price: string;
  lastSale?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
    rarity?: number;
  }>;
  rarityRank?: number;
  rarityScore?: number;
  owner?: string;
  tokenId?: string;
}

export const availableNFTs: NFTData[] = [
  {
    id: "1",
    name: "Cosmic Voyager #042",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoPGN5EkURmqDpgTYnlJ0VQxFuAyXbhka81jzw",
    collection: "Cosmic Series",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypowNsYN9UuGsmZFnW0VycwkvQUeR4Mg7aL5o1x",
    price: "2.5",
    lastSale: "2.0",
    rarityRank: 156,
    rarityScore: 86.42,
    owner: "0x1a2b...3c4d",
    tokenId: "42",
    attributes: [
      { trait_type: "Background", value: "Deep Space", rarity: 8.5 },
      { trait_type: "Character", value: "Voyager", rarity: 12.3 },
      { trait_type: "Accessory", value: "Nebula Map", rarity: 3.2 },
      { trait_type: "Helmet", value: "Crystal Visor", rarity: 1.5 },
      { trait_type: "Suit", value: "Quantum Armor", rarity: 5.7 },
    ],
  },
  {
    id: "2",
    name: "Digital Dreamscape",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxppOJrtFC1a2S06AJNu9MsdPXG8D5oerTblR",
    collection: "Dream Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypowNsYN9UuGsmZFnW0VycwkvQUeR4Mg7aL5o1x",
    price: "1.8",
    lastSale: "1.5",
    rarityRank: 342,
    rarityScore: 72.18,
    owner: "0x5e6f...7g8h",
    tokenId: "87",
    attributes: [
      { trait_type: "Background", value: "Nebula", rarity: 12.1 },
      { trait_type: "Character", value: "Dreamer", rarity: 8.7 },
      { trait_type: "Accessory", value: "Dream Catcher", rarity: 5.4 },
      { trait_type: "Helmet", value: "None", rarity: 45.2 },
      { trait_type: "Suit", value: "Ethereal Robes", rarity: 7.3 },
    ],
  },
  {
    id: "3",
    name: "Abstract Dimensions #023",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoBFgRTlkq9k2zJh4F5OKicHTlarv3YGQjpDZb",
    collection: "Abstract Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypowNsYN9UuGsmZFnW0VycwkvQUeR4Mg7aL5o1x",
    price: "3.2",
    lastSale: "2.8",
    rarityRank: 78,
    rarityScore: 92.35,
    owner: "0x9i0j...1k2l",
    tokenId: "23",
    attributes: [
      { trait_type: "Background", value: "Void", rarity: 3.2 },
      { trait_type: "Character", value: "Abstract Entity", rarity: 4.5 },
      { trait_type: "Accessory", value: "Dimensional Key", rarity: 1.2 },
      { trait_type: "Helmet", value: "Cosmic Crown", rarity: 2.3 },
      { trait_type: "Suit", value: "Fractal Pattern", rarity: 3.8 },
    ],
  },
  {
    id: "4",
    name: "Future Relic #007",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypokRuewWrPieNLljoZXDu7tSgcd5rJ2sYCBAxK",
    collection: "Future Collection",
    collectionImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypowNsYN9UuGsmZFnW0VycwkvQUeR4Mg7aL5o1x",
    price: "0.9",
    lastSale: "0.75",
    rarityRank: 1205,
    rarityScore: 45.67,
    owner: "0x3m4n...5o6p",
    tokenId: "7",
    attributes: [
      { trait_type: "Background", value: "Cityscape", rarity: 18.5 },
      { trait_type: "Character", value: "Android", rarity: 22.3 },
      { trait_type: "Accessory", value: "Hologram", rarity: 9.7 },
      { trait_type: "Helmet", value: "Cybernetic", rarity: 12.5 },
      { trait_type: "Suit", value: "Neon Exoskeleton", rarity: 8.2 },
    ],
  },
];
