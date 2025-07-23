require("dotenv").config()
const { Contract } = require("ethers")
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
]

// Setup contract
const ERC20_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const contract = new Contract(ERC20_ADDRESS, ERC20_ABI, provider)

async function main() {
  // Get contract state
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals()
  const totalSupply = await contract.totalSupply()
  
  // Log contract state
  console.log(`\nReading from ${ERC20_ADDRESS}:\n`);
  console.log(`Token name: ${name}`);
  console.log(`Token Symbol: ${symbol}`)
  console.log( `Token decimals: ${decimals}`)
  console.log( `Token total supply: ${totalSupply}`)
  
  // Get ERC20 balance
  const wallet = "0x4FF7eA40DBB5294Cc51E6d11cA3C4b955c783321"
  const balance = await contract.balanceOf(wallet);
  
  // Log ERC20 balance
  console.log(`wallet balance: ${balance}`)
}

main()