export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
      {
        internalType: "string",
        name: "secretKey",
        type: "string",
      },
    ],
    name: "addData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Data",
    outputs: [
      {
        internalType: "string",
        name: "identifier",
        type: "string",
      },
      {
        internalType: "string",
        name: "secretKey",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllData",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "status",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
