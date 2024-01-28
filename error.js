const ErrorCodes = {
  UNKNOWN: -1,
  INSUFFICIENT_BTC_UTXO: -2,
  INSUFFICIENT_ASSET_UTXO: -3,
  NOT_SAFE_UTXOS: -4,
  ASSET_MAYBE_LOST: -5,
};

const ErrorMessages = {
  [ErrorCodes.UNKNOWN]: "Unknown error",
  [ErrorCodes.INSUFFICIENT_BTC_UTXO]: "Insufficient btc utxo",
  [ErrorCodes.INSUFFICIENT_ASSET_UTXO]: "Insufficient asset utxo",
  [ErrorCodes.NOT_SAFE_UTXOS]: "Not safe utxos",
  [ErrorCodes.ASSET_MAYBE_LOST]: "Asset maybe lost",
};

class WalletUtilsError extends Error {
  code = ErrorCodes.UNKNOWN;
  constructor(code, message = ErrorMessages[code] || "Unknown error") {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, WalletUtilsError.prototype);
  }
}

module.exports = {
  ErrorCodes,
  ErrorMessages,
  WalletUtilsError,
};
