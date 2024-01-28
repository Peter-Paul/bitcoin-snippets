const pkg = require("bitcore-lib");
const ecies = require("ecies-lite");

const { PrivateKey, Networks } = pkg;

function generateKeys() {
  const network = Networks.livenet;
  const privateKey = new PrivateKey(Networks[network]);
  return {
    privateKey: privateKey,
    P2PKHAddress: privateKey.toAddress(),
    publicKey: privateKey.toPublicKey(),
    wif: privateKey.toWIF(),
  };
}

function main() {
  const result = generateKeys();
  console.log(`
    Private Key: ${result.privateKey}
    Public Key: ${result.publicKey}
    P2PKH Address: ${result.P2PKHAddress}`);
  const body = ecies.encrypt(
    result.publicKey.toBuffer(),
    Buffer.from("This message is for demo purpose")
  );
  console.log(body);
  const message = ecies.decrypt(result.privateKey.toBuffer(), body);
  console.log(message.toString());
}

main();
