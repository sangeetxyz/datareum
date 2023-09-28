import { ethers } from "ethers";
import { abi } from "./abi";

const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ALCHEMY_HTTP,
);
const wallet = new ethers.Wallet(
  process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY!,
  provider,
);
export const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  abi,
  wallet,
);
