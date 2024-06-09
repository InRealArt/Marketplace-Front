export const marketplaceAbi = [
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "items",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        name: "itemId",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "nft",
        type: "address",
        internalType: "contract IERC721"
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "price",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "seller",
        type: "address",
        internalType: "address payable"
      },
      {
        name: "sold",
        type: "bool",
        internalType: "bool"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getItem",
    inputs: [
      {
        name: "_itemId",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [
      {
        name: "item_",
        type: "tuple",
        internalType: "struct Marketplace.Item",
        components: [
          {
            name: "itemId",
            type: "uint256",
            internalType: "uint256"
          },
          {
            name: "nft",
            type: "address",
            internalType: "contract IERC721"
          },
          {
            name: "tokenId",
            type: "uint256",
            internalType: "uint256"
          },
          {
            name: "price",
            type: "uint256",
            internalType: "uint256"
          },
          {
            name: "seller",
            type: "address",
            internalType: "address payable"
          },
          {
            name: "sold",
            type: "bool",
            internalType: "bool"
          }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "listItem",
    inputs: [
      {
        name: "_nft",
        type: "address",
        internalType: "contract IERC721"
      },
      {
        name: "_tokenId",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "purchaseItem",
    inputs: [
      {
        name: "_itemId",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "error",
    name: "AccessControlBadConfirmation",
    inputs: []
  },
  {
    type: "error",
    name: "AccessControlEnforcedDefaultAdminDelay",
    inputs: [
      {
        name: "schedule",
        type: "uint48",
        internalType: "uint48"
      }
    ]
  },
  {
    type: "error",
    name: "AccessControlEnforcedDefaultAdminRules",
    inputs: []
  },
  {
    type: "error",
    name: "AccessControlInvalidDefaultAdmin",
    inputs: [
      {
        name: "defaultAdmin",
        type: "address",
        internalType: "address"
      }
    ]
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address"
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32"
      }
    ]
  },
  {
    type: "error",
    name: "BalanceEtherError",
    inputs: []
  },
  {
    type: "error",
    name: "FeeZeroError",
    inputs: []
  },
  {
    type: "error",
    name: "ItemDoesNotExistError",
    inputs: []
  },
  {
    type: "error",
    name: "ItemElreadySoldError",
    inputs: []
  },
  {
    type: "error",
    name: "NotSellerError",
    inputs: []
  },
  {
    type: "error",
    name: "PriceZeroError",
    inputs: []
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: []
  },
  {
    type: "error",
    name: "SafeCastOverflowedUintDowncast",
    inputs: [
      {
        name: "bits",
        type: "uint8",
        internalType: "uint8"
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256"
      }
    ]
  }
] as const