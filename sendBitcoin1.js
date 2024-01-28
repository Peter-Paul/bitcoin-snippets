const fromWIF = "cTTQc5hRrAEiuNJWe18r1yc4bsWqa45ESQZicD8rYPNyvJTDG5GM";
const toAddress = "tb1q44ldkgq6ggxjq234jkjx53m9a3n4zh030sf7d0";
const explorers = require("bitcore-explorers");
const bitcore = require("bitcore-lib");

// Set the network to testnet
const network = bitcore.Networks.testnet;

// Replace these with your own testnet wallet details
// const fromWIF = 'your_private_key_in_WIF_format';
// const toAddress = 'testnet_receiver_address';
const amountToSend = 0.00001; // amount in BTC

// Create a private key from the WIF (Wallet Import Format)
const privateKey = new bitcore.PrivateKey(fromWIF, network);

// Create a transaction
const transaction = new bitcore.Transaction()
  .from({
    txid: "previous_transaction_id",
    vout: 0, // index of the output in the previous transaction
    scriptPubKey: privateKey.toAddress().toScript(),
    satoshis: 100000, // amount of satoshis in the previous output
  })
  .to(toAddress, bitcore.Unit.fromBTC(amountToSend).toSatoshis())
  .fee(10000) // fee in satoshis
  .change(privateKey.toAddress())
  .sign(privateKey);

// Broadcast the transaction using a block explorer API
const insight = new explorers.Insight(network);
insight.broadcast(transaction, (error, transactionId) => {
  if (error) {
    console.error("Error broadcasting transaction:", error);
  } else {
    console.log("Transaction broadcasted. Transaction ID:", transactionId);
  }
});
