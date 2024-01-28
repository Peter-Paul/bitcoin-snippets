const bitcore = require("bitcore-lib");
const Insight = require("bitcore-insight").Insight;

let insight = new Insight("testnet");

// Our private key and address
const wif = "cTTQc5hRrAEiuNJWe18r1yc4bsWqa45ESQZicD8rYPNyvJTDG5GM";
const privateKey = new bitcore.PrivateKey(wif);
const myAddress = privateKey.toAddress();

// let value = Buffer.from(
//   "guide divorce cute desk leopard thrive escape discover salmon make inflict modify"
// );
// let hash = bitcore.crypto.Hash.sha256(value);
// let bn = bitcore.crypto.BN.fromBuffer(hash);
// const privateKey = new bitcore.PrivateKey(bn);
// const myAddress = privateKey.toAddress();
console.log(myAddress.toString());

// Address we are sending Bitcoin to
const wif2 = "cT8YVRgtiEB2C5oX96cpvQmcNpEWdZABqhZE2i8rDht2UHTnR2QY";
const privateKey2 = new bitcore.PrivateKey(wif2);
const addressTo = privateKey2.toAddress();
// const addressTo = "moCEHE5fJgb6yHtF9eLNnS52UQVUkHjnNm";
console.log(addressTo.toString());

// Start the creating our transaction
const amount = 10; // Sending amount must be in satoshis
const fee = 1; // Fee is in satoshis

// Get the UTXOs of your Bitcoin address
insight.getUtxos(myAddress, (err, utxos) => {
  if (err) {
    //Handle errors
    console.log(err);
    return err;
  } else {
    // use the UTXOs to create transaction with bitcore Transaction object
    console.log("Generating txs", utxos);
    let tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(addressTo, amount);
    tx.change(myAddress);
    tx.fee(fee);
    tx.sign(privateKey);
    tx.serialize();

    // Broadcast your transaction to the Bitcoin network
    insight.broadcast(tx.toString(), (error, txid) => {
      if (error) {
        return error;
      } else {
        // Your Transaction Id
        console.log(txid);
      }
    });
  }
});

// Randomly

// const bitcore = require('bitcore-lib');
// const Insight = require('bitcore-insight').Insight;
// let insight = new Insight('testnet');
// const privateKey = new bitcore.PrivateKey();
// // From a SHA256 hash

// const bitcore = require('bitcore-lib');
// const Insight = require('bitcore-insight').Insight;
// let insight = new Insight('testnet');
// let value = Buffer.from('cat horse shoe lightning awesome bitcoin');
// let hash = bitcore.crypto.Hash.sha256(value);
// let bn = bitcore.crypto.BN.fromBuffer(hash);
// const privateKey = new bitcore.PrivateKey(bn);

// // Importing through Wallet Import Format (WIF)

// const bitcore = require('bitcore-lib')
// const Insight = require('bitcore-insight').Insight;
// let insight = new Insight('testnet');
// const wif = 'xBtatQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct';
// const privateKey = new bitcore.PrivateKey(wif);
