// Constants.js
const prod: any = {
  url: {
    API_URL: "https://blockd.app/backend/api",
    PUBLIC_URL: "https://d12obed56w9rwd.cloudfront.net",
    DASHBOARD_URL: "https://blockd.app/dashboard",
    ALCHEMY_API_KEY: "MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9",
  },
};

const dev = {
  url: {
    API_URL: "http://127.0.0.1:8000/api",
    PUBLIC_URL: "https://d12obed56w9rwd.cloudfront.net",
    DASHBOARD_URL: "http://localhost:3000/dashboard",
    ALCHEMY_API_KEY: "MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9",
  },
};

const staging = {
  url: {
    API_URL: "https://staging.blockd.app/backend/api",
    PUBLIC_URL: "https://d12obed56w9rwd.cloudfront.net",
    DASHBOARD_URL: "https://staging.blockd.app/dashboard",
    ALCHEMY_API_KEY: "MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9",
  },
};

const envv = process.env.ENV || 'development';
const configs = {
  development: {
    url: {
      API_URL: "http://127.0.0.1:8000/api",
      PUBLIC_URL: "https://d12obed56w9rwd.cloudfront.net",
      DASHBOARD_URL: "http://localhost:3000/dashboard",
      ALCHEMY_API_KEY: "MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9",
    },
  },
  staging: {
    url: {
      API_URL: "https://staging.blockd.app/backend/api",
      PUBLIC_URL: "https://d12obed56w9rwd.cloudfront.net",
      DASHBOARD_URL: "https://staging.blockd.app/dashboard",
      ALCHEMY_API_KEY: "MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9",
    },
  },
  production: {
    url: {
      API_URL: "https://blockd.app/backend/api",
      PUBLIC_URL: "https://d12obed56w9rwd.cloudfront.net",
      DASHBOARD_URL: "https://blockd.app/dashboard",
      ALCHEMY_API_KEY: "MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9",
    },
  },
};

export const config = envv === 'staging' ? staging : prod;
export const GID = process.env.NODE_ENV === "development" ? "" : "=G-QW4Q5G8G4K";

export const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "implementationAddress",
        type: "address",
      },
      { internalType: "address", name: "ownerAddress", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousImplementation",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "ProxyImplementationUpdated",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "id", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

export const contractADDRESS = "0xdE1dEBADfc466cc50BBaad33917a954d9D77b874";
