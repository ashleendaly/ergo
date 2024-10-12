import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();


console.log(process.env.NETWORK_URL)


const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.NETWORK_URL ?? "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
