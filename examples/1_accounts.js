// Require packages
require("dotenv").config()
const {ethers} = require("ethers");

// Setup connection
const url= `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(url)

const ADDRESS = "0x06138A30b8A2c59c386436D9FB02135d91c0b639"

async function main() {
  // Get balance
  const balance = await provider.getBalance(ADDRESS)
  // Log balance
  console.log(`\nETH Balance of ${ADDRESS} --> ${ethers.formatUnits(balance, 18)} ETH\n`)
}

main()