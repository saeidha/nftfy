export type NftType = {
  id: number;
  name: string;
  description: string;
  collectionAddress: `0x${string}`;
  tokenIdCounter: number;
  maxSupply: number;
  baseImageURI: string;
  remaining: number;
  maxTime: number;
  mintPerWallet: boolean;
  mintPrice: string;
  actualPrice: string;
  isDisable: boolean;
  isUltimateMintTime: boolean;
  isUltimateMintQuantity: boolean;
  date: string;
  hour: string;
  symbol: string;
  price: string;
};

type RandomType = {};
