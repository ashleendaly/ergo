const hardhat = require("hardhat");

async function deploy() {
  const contractName = "Drone";
  try {
    const deployedContract = await hardhat.viem.deployContract(contractName, [558574, 42571]); // floats * 10000
    console.log("Contract is deployed at: ", deployedContract.address);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

deploy();