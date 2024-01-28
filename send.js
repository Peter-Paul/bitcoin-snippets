const bitcoin = require("bitcoinjs-lib");
const ECPairFactory = require("ecpair");
const ecc = require("tiny-secp256k1");
const axios = require("axios");

//
const ECPair = ECPairFactory.ECPairFactory(ecc);

// Set the network to testnet
const network = bitcoin.networks.testnet;

// Replace these with your own testnet wallet details
const fromWIF = "cTTQc5hRrAEiuNJWe18r1yc4bsWqa45ESQZicD8rYPNyvJTDG5GM";
const toAddress = "tb1q44ldkgq6ggxjq234jkjx53m9a3n4zh030sf7d0";
const amountToSend = 0.00001; // amount in BTC

// Create a key pair from the private key
const keyPair = ECPair.fromWIF(fromWIF, network);

// Create a P2PKH (Pay to Public Key Hash) address
const fromAddress = bitcoin.payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: network,
}).address;

// Fetch the UTXOs (Unspent Transaction Outputs) for the fromAddress
axios
  .get(`https://blockstream.info/testnet/api/address/${fromAddress}/utxo`)
  .then((response) => {
    const utxos = response.data;

    // Create a transaction builder
    const txb = new bitcoin.TransactionBuilder(network);

    // Add the UTXOs as inputs to the transaction
    utxos.forEach((utxo) => {
      txb.addInput(utxo.txid, utxo.vout);
    });

    // Add the output to the receiver's address
    txb.addOutput(toAddress, bitcoin.amount.toSatoshi(amountToSend));

    // Sign the transaction with the private key
    utxos.forEach((utxo, index) => {
      txb.sign(index, keyPair);
    });

    // Build the transaction
    const rawTx = txb.build().toHex();

    // Broadcast the transaction
    axios
      .post("https://blockstream.info/testnet/api/tx", rawTx)
      .then((response) => {
        console.log("Transaction broadcasted:", response.data);
      })
      .catch((error) => {
        console.error("Error broadcasting transaction:", error.response.data);
      });
  })
  .catch((error) => {
    console.error("Error fetching UTXOs:", error);
  });
