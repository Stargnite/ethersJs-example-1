require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
];

// Setup contract
const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)

// Define reciever
const RECIEVER = "0xC859F0b1D8EF3839CB0395421B262DF8aeABA0e3" // Your account address 2

async function main() {
  const privateKey = await promptForKey()

  // Setup wallet
  const wallet = new ethers.Wallet(privateKey, provider)

  // Get ERC20 balances
  const senderBalanceBefore = await contract.balanceOf(wallet.address)
  const recieverBalanceBefore = await contract.balanceOf(RECIEVER)

  // Log ERC20 balances
  const decimals = await contract.decimals()
  console.log(`\nReading from ${ERC20_ADDRESS}\n`)
  console.log(`Sender balance before: ${ethers.formatUnits(senderBalanceBefore, decimals)}`)
  console.log(`Reciever balance before: ${ethers.formatUnits(recieverBalanceBefore, decimals)}\n`)

  // Setup amount to transfer
  const AMOUNT =  ethers.parseUnits("2", decimals)
  
  // Create transaction
  const transaction = await contract.connect(wallet).transfer(RECIEVER, AMOUNT)
  
  // Wait transaction
  await transaction.wait()

  // Log transaction
  console.log(transaction);

  // Get ERC20 balances
  const senderBalanceAfter = await contract.balanceOf(wallet.address)
  const recieverBalanceAfter = await contract.balanceOf(RECIEVER)

  console.log(`\nBalance of sender: ${ethers.formatUnits(senderBalanceAfter, decimals)}`)
  console.log(`Balance of reciever: ${ethers.formatUnits(recieverBalanceAfter, decimals)}\n`)
}

main()