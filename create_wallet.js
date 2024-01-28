const bitcore = require("bitcore-lib");

const randomWallet = (main = true) => {
  const { PrivateKey, Networks } = bitcore;
  const network = main ? Networks.livenet : Networks.testnet;
  const privateKey = new PrivateKey(Networks[network]);
  console.log({
    privateKey: privateKey.toString(),
    P2PKHAddress: privateKey.toAddress().toString(),
    publicKey: privateKey.toPublicKey().toString(),
    wif: privateKey.toWIF().toString(),
  });
};

randomWallet(false);
