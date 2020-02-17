class SazaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SazaError';
  }
}

const transaction = {
  tx_failed: 'One of the operations failed',
  tx_too_early: 'Ledger closeTime before minTime value in the transaction.',
  tx_too_late: 'Ledger closeTime after maxTime value in the transaction.',
  tx_missing_operation: 'No operation was specified.',
  tx_bad_seq: 'Sequence number does not match source account.',
  tx_bad_auth: 'Too few valid signatures / wrong network.',
  tx_insufficient_balance: `Fee would bring account below minimum reserve.`,
  tx_no_account: `Source account not found.`,
  tx_insufficient_fee: 'Fee is too small.',
  tx_bad_auth_extra: 'Unused signatures attached to transaction.',
  tx_internal_error: 'An unknown error occured.',
};

const createAccount = {
  OP_MALFORMED: 'The destination is invalid.',
  OP_UNDERFUNDED: `The source account performing the command does not have enough funds to give destination the starting balance amount of XLM and still maintain its minimum XLM reserve plus satisfy its XLM selling liabilities.`,
  OP_LOW_RESERVE:
    'This operation would create an account with fewer than the minimum number of XLM an account must hold.',
  OP_ALREADY_EXISTS: 'The destination account already exists.',
};

const payment = {
  OP_MALFORMED: 'The input to the payment is invalid.',
  OP_UNDERFUNDED:
    'The source account (sender) does not have enough funds to send amount and still satisfy its selling liabilities. Note that if sending XLM then the sender must additionally maintain its minimum XLM reserve.',
  OP_SRC_NO_TRUST:
    'The source account does not trust the issuer of the asset it is trying to send.',
  OP_SRC_NOT_AUTHORIZED:
    'The source account is not authorized to send this payment.',
  OP_NO_DESTINATION: 'The receiving account does not exist.',
  OP_NO_TRUST:
    'The receiver does not trust the issuer of the asset being sent.',
  OP_NOT_AUTHORIZED:
    'The destination account is not authorized by the asset’s issuer to hold the asset.',
  OP_LINE_FULL:
    'The destination account (receiver) does not have sufficient limits to receive amount and still satisfy its buying liabilities.',
  OP_NO_ISSUER: 'The issuer of the asset does not exist.',
};

const pathPaymentStrictSend = {
  OP_MALFORMED: 'The input to this path payment is invalid.',
  OP_UNDERFUNDED:
    'The source account (sender) does not have enough funds to send and still satisfy its selling liabilities. Note that if sending XLM then the sender must additionally maintain its minimum XLM reserve.',
  OP_SRC_NO_TRUST:
    'The source account does not trust the issuer of the asset it is trying to send.',
  OP_SRC_NOT_AUTHORIZED:
    'The source account is not authorized to send this payment.',
  OP_NO_DESTINATION: 'The destination account does not exist.',
  OP_NO_TRUST:
    'The destination account does not trust the issuer of the asset being sent. For more, see the assets doc.',
  OP_NOT_AUTHORIZED:
    'The destination account is not authorized by the asset’s issuer to hold the asset.',
  OP_LINE_FULL:
    'The destination account does not have sufficient limits to receive destination amount and still satisfy its buying liabilities.',
  OP_NO_ISSUER: 'The issuer of one of the assets is missing.',
  OP_TOO_FEW_OFFERS:
    'There is no path of offers connecting the send asset and destination asset. Stellar only considers paths of length 5 or shorter.',
  OP_OFFER_CROSS_SELF: 'The payment would cross one of its own offers.',
  OP_UNDER_DESTMIN:
    'The paths that could send destination amount of destination asset would fall short of destination min.',
};

const pathPaymentStrictReceive = {
  OP_MALFORMED: 'The input to this path payment is invalid.',
  OP_UNDERFUNDED:
    'The source account (sender) does not have enough funds to send and still satisfy its selling liabilities. Note that if sending XLM then the sender must additionally maintain its minimum XLM reserve.',
  OP_SRC_NO_TRUST:
    'The source account does not trust the issuer of the asset it is trying to send.',
  OP_SRC_NOT_AUTHORIZED:
    'The source account is not authorized to send this payment.',
  OP_NO_DESTINATION: 'The destination account does not exist.',
  OP_NO_TRUST:
    'The destination account does not trust the issuer of the asset being sent.',
  OP_NOT_AUTHORIZED:
    'The destination account is not authorized by the asset’s issuer to hold the asset.',
  OP_LINE_FULL:
    'The destination account does not have sufficient limits to receive destination amount and still satisfy its buying liabilities.',
  OP_NO_ISSUER: 'The issuer of one the of assets is missing.',
  OP_TOO_FEW_OFFERS:
    'There is no path of offers connecting the send asset and destination asset. Stellar only considers paths of length 5 or shorter.',
  OP_OFFER_CROSS_SELF: 'The payment would cross one of its own offers.',
  OP_OVER_SENDMAX:
    'The paths that could send destination amount of destination asset would exceed send max.',
};

const manageBuyOffer = {
  OP_MALFORMED: 'The input is incorrect and would result in an invalid offer.',
  OP_SELL_NO_TRUST:
    'The account creating the offer does not have a trustline for the asset it is selling.',
  OP_BUY_NO_TRUST:
    'The account creating the offer does not have a trustline for the asset it is buying.',
  OP_BUY_NOT_AUTHORIZED:
    'The account creating the offer is not authorized to sell this asset.',
  OP_SELL_NOT_AUTHORIZED:
    'The account creating the offer is not authorized to buy this asset.',
  OP_LINE_FULL:
    'The account creating the offer does not have sufficient limits to receive buying and still satisfy its buying liabilities.',
  OP_UNDERFUNDED:
    'The account creating the offer does not have sufficient limits to send selling and still satisfy its selling liabilities. Note that if selling XLM then the account must additionally maintain its minimum XLM reserve, which is calculated assuming this offer will not completely execute immediately.',
  OP_CROSS_SELF:
    'The account has opposite offer of equal or lesser price active, so the account creating this offer would immediately cross itself.',
  OP_SELL_NO_ISSUER: 'The issuer of selling asset does not exist.',
  OP_BUY_NO_ISSUER: 'The issuer of buying asset does not exist.',
  OP_NOT_FOUND: 'An offer with that offerID cannot be found.',
  OP_LOW_RESERVE:
    'The account creating this offer does not have enough XLM to satisfy the minimum XLM reserve increase caused by adding a subentry and still satisfy its XLM selling liabilities. For every offer an account creates, the minimum amount of XLM that account must hold will increase.',
};

const manageSellOffer = {
  ...manageBuyOffer,
};

const createPassiveSellOffer = {
  ...manageBuyOffer,
};

const setOptions = {
  OP_LOW_RESERVE:
    'This account does not have enough XLM to satisfy the minimum XLM reserve increase caused by adding a subentry and still satisfy its XLM selling liabilities. For every new signer added to an account, the minimum reserve of XLM that account must hold increases.',
  OP_TOO_MANY_SIGNERS:
    '20 is the maximum number of signers an account can have, and adding another signer would exceed that.',
  OP_BAD_FLAGS:
    'The flags set and/or cleared are invalid by themselves or in combination.',
  OP_INVALID_INFLATION:
    'The destination account set in the inflation field does not exist.',
  OP_CANT_CHANGE:
    'This account can no longer change the option it wants to change.',
  OP_UNKNOWN_FLAG: 'The account is trying to set a flag that is unknown.',
  OP_THRESHOLD_OUT_OF_RANGE:
    'The value for a key weight or threshold is invalid.',
  OP_BAD_SIGNER:
    'Any additional signers added to the account cannot be the master key.',
  OP_INVALID_HOME_DOMAIN: 'Home domain is malformed.',
};

const changeTrust = {
  OP_MALFORMED: 'The input to this operation is invalid.',
  OP_NO_ISSUER: 'The issuer of the asset cannot be found.',
  OP_INVALID_LIMIT:
    'The limit is not sufficient to hold the current balance of the trustline and still satisfy its buying liabilities.',
  OP_LOW_RESERVE:
    'This account does not have enough XLM to satisfy the minimum XLM reserve increase caused by adding a subentry and still satisfy its XLM selling liabilities. For every new trustline added to an account, the minimum reserve of XLM that account must hold increases.',
  OP_SELF_NOT_ALLOWED:
    'The source account attempted to create a trustline for itself, which is not allowed.',
};

const allowTrust = {
  OP_MALFORMED:
    'The asset specified in type is invalid. In addition, this error happens when the native asset is specified.',
  OP_NO_TRUST_LINE:
    'The trustor does not have a trustline with the issuer performing this operation.',
  OP_TRUST_NOT_REQUIRED:
    'The source account (issuer performing this operation) does not require trust. In other words, it does not have the flag AUTH_REQUIRED_FLAG set.',
  OP_CANT_REVOKE:
    'The source account is trying to revoke the trustline of the trustor, but it cannot do so.',
  OP_SELF_NOT_ALLOWED:
    'The source account attempted to allow a trustline for itself, which is not allowed because an account cannot create a trustline with itself.',
};

const accountMerge = {
  OP_MALFORMED:
    'The operation is malformed because the source account cannot merge with itself. The destination must be a different account.',
  OP_NO_ACCOUNT: 'The destination account does not exist.',
  OP_IMMUTABLE_SET: 'The source account has AUTH_IMMUTABLE flag set.',
  OP_HAS_SUB_ENTRIES: 'The source account has trust lines/offers.',
  OP_SEQNUM_TOO_FAR: 'Source’s account sequence number is too high.',
  OP_DEST_FULL:
    'The destination account cannot receive the balance of the source account and still satisfy its lumen buying liabilities.',
};

const manageData = {
  OP_NOT_SUPPORTED_YET:
    'The network hasn’t moved to this protocol change yet. This failure means the network doesn’t support this feature yet.',
  OP_NAME_NOT_FOUND:
    'Trying to remove a Data Entry that isn’t there. This will happen if Name is set (and Value isn’t) but the Account doesn’t have a DataEntry with that Name.',
  OP_LOW_RESERVE:
    'This account does not have enough XLM to satisfy the minimum XLM reserve increase caused by adding a subentry and still satisfy its XLM selling liabilities. For every new DataEntry added to an account, the minimum reserve of XLM that account must hold increases.',
  OP_INVALID_NAME: 'Name not a valid string.',
};

const bumpSequence = {
  OP_BAD_SEQ:
    'The specified bumpTo sequence number is not a valid sequence number. It must be between 0 and INT64_MAX (9223372036854775807 or 0x7fffffffffffffff)',
};

const TransactionErrors = {
  transaction,
  createAccount,
  payment,
  pathPaymentStrictSend,
  pathPaymentStrictReceive,
  manageBuyOffer,
  manageSellOffer,
  createPassiveSellOffer,
  setOptions,
  changeTrust,
  allowTrust,
  accountMerge,
  manageData,
  bumpSequence,
};

export { SazaError, TransactionErrors };
