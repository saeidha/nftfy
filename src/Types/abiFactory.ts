export const abi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createAndMint",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "description",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "imageURL",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "createCollection",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "description",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "imageURL",
        type: "string",
        internalType: "string",
      },
      {
        name: "maxSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maxTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "mintPerWallet",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "mintPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isUltimateMintTime",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "isUltimateMintQuantity",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployedCollections",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAvailableCollectionsToMintDetails",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct AIBasedNFTFactory.CollectionDetails[]",
        components: [
          {
            name: "collectionAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "tokenIdCounter",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseImageURI",
            type: "string",
            internalType: "string",
          },
          {
            name: "maxTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintPerWallet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "mintPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "actualPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isDisable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintTime",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintQuantity",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAvailableCollectionsToMintDetails",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct AIBasedNFTFactory.CollectionDetails[]",
        components: [
          {
            name: "collectionAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "tokenIdCounter",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseImageURI",
            type: "string",
            internalType: "string",
          },
          {
            name: "maxTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintPerWallet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "mintPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "actualPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isDisable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintTime",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintQuantity",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollectionDetailsByContractAddress",
    inputs: [
      {
        name: "contractAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct AIBasedNFTFactory.CollectionDetails",
        components: [
          {
            name: "collectionAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "tokenIdCounter",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseImageURI",
            type: "string",
            internalType: "string",
          },
          {
            name: "maxTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintPerWallet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "mintPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "actualPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isDisable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintTime",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintQuantity",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollectionDetailsByContractAddress",
    inputs: [
      {
        name: "contractAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct AIBasedNFTFactory.CollectionDetails",
        components: [
          {
            name: "collectionAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "tokenIdCounter",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseImageURI",
            type: "string",
            internalType: "string",
          },
          {
            name: "maxTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintPerWallet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "mintPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "actualPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isDisable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintTime",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintQuantity",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollections",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFee",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMintPadCollections",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserCollections",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserCollectionsCount",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserCollectionsDetails",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct AIBasedNFTFactory.CollectionDetails[]",
        components: [
          {
            name: "collectionAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "tokenIdCounter",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseImageURI",
            type: "string",
            internalType: "string",
          },
          {
            name: "maxTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintPerWallet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "mintPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "actualPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isDisable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintTime",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isUltimateMintQuantity",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserMintCount",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserMints",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintNFT",
    inputs: [
      {
        name: "collectionAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "quantity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "mintPadCollections",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payGenerateFee",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGenerateFee",
    inputs: [
      {
        name: "_newFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ChangeGenerateFee",
    inputs: [
      {
        name: "newFee",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CollectionCreated",
    inputs: [
      {
        name: "collection",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        indexed: true,
        internalType: "string",
      },
      {
        name: "description",
        type: "string",
        indexed: true,
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "maxSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "maxTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "imageURL",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "mintPerWallet",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "mintPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EtherWithdrawn",
    inputs: [
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NFTMinted",
    inputs: [
      {
        name: "collectionAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "quantity",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "InsufficientFee",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidRecipient",
    inputs: [],
  },
  {
    type: "error",
    name: "NoEtherToWithdraw",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlyAdmin",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;
