require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

async function main() {
  const privateKey = await promptForKey()

  // Setup wallet
  const wallet = new ethers.Wallet(privateKey, provider);
  const RECIEVER = "0xC859F0b1D8EF3839CB0395421B262DF8aeABA0e3"

  // Get balances
  const senderBalanceBefore = await provider.getBalance(wallet.address)
  const recieverBalanceBefore = await provider.getBalance(RECIEVER)

  // Log balances
  console.log(`\nSender balance before: ${ethers.formatUnits(senderBalanceBefore, 18)}`)
  console.log(`\nReciever balance before: ${ethers.formatUnits(recieverBalanceBefore, 18)}`)
  
  // Create transaction
  const transaction = await wallet.sendTransaction({
    to: RECIEVER,
    value: ethers.parseUnits("0.01", 18)
  })

  // Wait transaction
  const receipt = await transaction.wait();

  console.log(transaction)
  console.log(receipt)

  // Get balances
  const senderBalanceAfter = await provider.getBalance(wallet.address)
  const recieverBalanceAfter = await provider.getBalance(RECIEVER)


  // Log balances
  console.log(`\nSender balance after: ${ethers.formatUnits(senderBalanceAfter, 18)}`)
  console.log(`\nReciever balance after: ${ethers.formatUnits(recieverBalanceAfter, 18)}\n`)
}

main()