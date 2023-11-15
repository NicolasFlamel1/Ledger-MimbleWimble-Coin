## APDUs

This app supports the following commands.

| Class | Instruction | Name                                         | Description |
|-------|-------------|----------------------------------------------|-------------|
| 0xC7  | 0x00        | `GET_ROOT_PUBLIC_KEY`                        | Returns an account's root public key |
| 0xC7  | 0x01        | `GET_ADDRESS`                                | Returns an account's address at a provided index |
| 0xC7  | 0x02        | `GET_SEED_COOKIE`                            | Returns an account's seed cookie |
| 0xC7  | 0x03        | `GET_COMMITMENT`                             | Returns an account's commitment for a provided identifier, value, and switch type |
| 0xC7  | 0x04        | `GET_BULLETPROOF_COMPONENTS`                 | Returns an account's bulletproof components for a provided identifier, value, and switch type |
| 0xC7  | 0x05        | `VERIFY_ROOT_PUBLIC_KEY`                     | Returns if the user verifies that an account's root public key is valid |
| 0xC7  | 0x06        | `VERIFY_ADDRESS`                             | Returns if the user verifies that an account's address at a provided index is valid |
| 0xC7  | 0x07        | `START_ENCRYPTING_SLATE`                     | Return a random nonce and optional salt that will be used to encrypt data that will be provided later for an account at a provided index |
| 0xC7  | 0x08        | `CONTINUE_ENCRYPTING_SLATE`                  | Returns the encrypted version of the provided data |
| 0xC7  | 0x09        | `FINISH_ENCRYPTING_SLATE`                    | Returns the tag of the data that was encrypted and an optional signature for the message |
| 0xC7  | 0x0A        | `START_DECRYPTING_SLATE`                     | Prepares to start decrypted data that will be provided later with a provided nonce and optional salt for an account at a provided index |
| 0xC7  | 0x0B        | `CONTINUE_DECRYPTING_SLATE`                  | Returns the decrypted version of the provided data that has then been encrypted with a random AES key |
| 0xC7  | 0x0C        | `FINISH_DECRYPTING_SLATE`                    | Returns the random AES key used to decrypted the data that was previously returned if a valid tag is provided |
| 0xC7  | 0x0D        | `START_TRANSACTION`                          | Starts a transaction for provided output, input, and fee values for an account at a provided index |
| 0xC7  | 0x0E        | `CONTINUE_TRANSACTION_INCLUDE_OUTPUT`        | Includes the output for a provided identifier, value, and switch type in the transaction |
| 0xC7  | 0x0F        | `CONTINUE_TRANSACTION_INCLUDE_INPUT`         | Includes the input for a provided identifier, value, and switch type in the transaction |
| 0xC7  | 0x10        | `CONTINUE_TRANSACTION_APPLY_OFFSET`          | Applies an offset to the transaction's blinding factor |
| 0xC7  | 0x11        | `CONTINUE_TRANSACTION_GET_PUBLIC_KEY`        | Returns the transaction's blinding factor's public key |
| 0xC7  | 0x12        | `CONTINUE_TRANSACTION_GET_PUBLIC_NONCE`      | Returns the transaction's public nonce |
| 0xC7  | 0x13        | `CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE` | Returns the signature for a provided message and public key signed with the transaction's blinding factor |
| 0xC7  | 0x14        | `FINISH_TRANSACTION`                         | Returns the signature for the provided kernel information signed with the transaction's blinding factor |
| 0xC7  | 0x15        | `GET_MQS_CHALLENGE_SIGNATURE`                | Returns the signature for a provided challenge signed with an account's MQS private key at a provided index |
| 0xC7  | 0x16        | `GET_LOGIN_CHALLENGE_SIGNATURE`              | Returns the signature for a provided challenge signed with an account's login private key |

## Response Codes

This app can return the following response codes.

| Code   | Name                  | Description |
|--------|-----------------------|-------------|
| 0xB100 | `UNKNOWN_CLASS`       | APDU's class is unknown |
| 0xB101 | `UNKNOWN_INSTRUCTION` | APDU's instruction in unknown |
| 0xB102 | `MALFORMED_REQUEST`   | APDU is malformed |
| 0xB103 | `USER_REJECTED`       | User rejected the request |
| 0xB104 | `INTERNAL_ERROR`      | An internal error occurred |
| 0xD100 | `INVALID_PARAMETERS`  | APDU's parameters or data is invalid |
| 0xD101 | `INVALID_STATE`       | Operation can't be performed in the current state |
| 0xD102 | `DEVICE_LOCKED`       | Device is locked |
| 0x9000 | `SUCCESS`             | Success |

## Commands

### GET_ROOT_PUBLIC_KEY

#### Description

Returns an account's root public key after displaying a message on the device's screen to obtain the user's approval. The root public key can be used to create a view key.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x00        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name      | Description |
|--------|-----------|-------------|
| 4      | `account` | Account number (little endian, max 0x7FFFFFFF) |

**Output Data**

| Length | Name              | Description |
|--------|-------------------|-------------|
| 33     | `root_public_key` | The compressed root public key for the provided account |

### GET_ADDRESS

#### Description

Returns an account's MQS or Tor address at a provided index. This address is also the account's payment proof address at the provided index.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x01        |

**Parameters**

| Parameter | Name           | Description |
|-----------|----------------|-------------|
| P1        | `address_type` | 0x00 for MQS or 0x01 for Tor address |
| P2        | N/A            | Unused (must be zero) |

**Input Data**

| Length | Name      | Description |
|--------|-----------|-------------|
| 4      | `account` | Account number (little endian, max 0x7FFFFFFF)) |
| 4      | `index`   | Index number (little endian) |

**Output Data**

| Length                           | Name      | Description |
|----------------------------------|-----------|-------------|
| 52 for MQS or 56 for Tor address | `address` | The account's MQS or Tor address at the provided index |

### GET_SEED_COOKIE

#### Description

Returns the SHA512 hash of the account's root public key. This hash can be used to determine if a connected hardware wallet corresponds to a previously obtained root public key.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x02        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name      | Description |
|--------|-----------|-------------|
| 4      | `account` | Account number (little endian, max 0x7FFFFFFF)) |

**Output Data**

| Length | Name          | Description |
|--------|---------------|-------------|
| 64     | `seed_cookie` | The SHA512 hash of the account's root public key |

### GET_COMMITMENT

#### Description

Returns the account's commitment for the provided identifier, value, and switch type.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x03        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name          | Description |
|--------|---------------|-------------|
| 4      | `account`     | Account number (little endian, max 0x7FFFFFFF)) |
| 17     | `identifier`  | Identifier |
| 8      | `value`       | Value to commit (little endian) |
| 1      | `switch_type` | 0x01 for regular |

**Output Data**

| Length | Name         | Description |
|--------|--------------|-------------|
| 33     | `commitment` | The account's commitment for the provided identifier, value, and switch type |

### GET_BULLETPROOF_COMPONENTS

#### Description

Returns the account's bulletproof components tau x, t one, and t two for the provided identifier, value, and switch type. These bulletproof components can be used to create a bulletproof. A processing message is displayed on the device for the duration of this command that shows either sending transaction, receiving transaction, or creating coinbase depending on the parameter provided.

This command takes about 50 seconds to complete on a Ledger Nano S hardware wallet and about 25 seconds to complete on a Ledger Nano S Plus hardware wallet.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x04        |

**Parameters**

| Parameter | Name           | Description |
|-----------|----------------|-------------|
| P1        | `message_type` | 0x00 for sending transaction, 0x01 for receiving transaction, or 0x02 for creating coinbase |
| P2        | N/A            | Unused (must be zero) |

**Input Data**

| Length | Name          | Description |
|--------|---------------|-------------|
| 4      | `account`     | Account number (little endian, max 0x7FFFFFFF)) |
| 17     | `identifier`  | Identifier |
| 8      | `value`       | Value to commit (little endian) |
| 1      | `switch_type` | 0x01 for regular |

**Output Data**

| Length | Name    | Description |
|--------|---------|-------------|
| 32     | `tau_x` | The tau x bulletproof component |
| 33     | `t_one` | The t one bulletproof component |
| 33     | `t_two` | The t two bulletproof component |

### VERIFY_ROOT_PUBLIC_KEY

#### Description

Displays the account's root public key on the device and returns if the user verifies if the root public key is valid.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x05        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name      | Description |
|--------|-----------|-------------|
| 4      | `account` | Account number (little endian, max 0x7FFFFFFF)) |

**Output Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

### VERIFY_ADDRESS

#### Description

Displays the account's MQS or Tor address at a provided index on the device and returns if the user verifies if the address is valid.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x06        |

**Parameters**

| Parameter | Name           | Description |
|-----------|----------------|-------------|
| P1        | `address_type` | 0x00 for MQS or 0x01 for Tor address |
| P2        | N/A            | Unused (must be zero) |

**Input Data**

| Length | Name      | Description |
|--------|-----------|-------------|
| 4      | `account` | Account number (little endian, max 0x7FFFFFFF)) |
| 4      | `index`   | Index number (little endian) |

**Output Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

### START_ENCRYPTING_SLATE

#### Description

Prepares the app's internal slate state to be able to encrypt data that will be provided later as an account at a provided index that can be decrypted by a provided address. An MQS recipient address can include an optional domain and port.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x07        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length                      | Name                | Description |
|-----------------------------|---------------------|-------------|
| 4                           | `account`           | Account number (little endian, max 0x7FFFFFFF)) |
| 4                           | `index`             | Index number (little endian) |
| >= 52 for MQS or 56 for Tor | `recipient_address` | Address that will be able to decrypt the data |

**Output Data**

| Length | Name    | Description |
|--------|---------|-------------|
| 12     | `nonce` | Random nonce used to encrypt the data |
| 0 or 8 | `salt`  | Optional random salt to encrypt the data that is used when the `recipient_address` is an MQS address |

### CONTINUE_ENCRYPTING_SLATE

#### Description

Encrypts the provided data using the app's internal slate state and returns it. The data must be provided in chunks of 64 bytes with the last chunk allowed to be less than 64 bytes.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x08        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length        | Name   | Description |
|---------------|--------|-------------|
| > 0 and <= 64 | `data` | Data chunk to encrypt |

**Output Data**

| Length        | Name             | Description |
|---------------|------------------|-------------|
| > 0 and <= 64 | `encrypted_data` | Encrypted version of the provided data chunk that is the same size as the provided data chunk |

### FINISH_ENCRYPTING_SLATE

#### Description

Returns the tag for all the data that was encrypted.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x09        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

**Output Data**

| Length           | Name                    | Description |
|------------------|-------------------------|-------------|
| 16               | `tag`                   | Tag for all the data that was encrypted |
| 0, > 0 and <= 72 | `mqs_message_signature` | Optional DER signature of the message if the data was encrypted for MQS transport |

### START_DECRYPTING_SLATE

#### Description

Prepares the app's internal slate state to be able to decrypt data that will be provided later as an account at a provided index using a provided nonce and optional salt that was encrypted by a provided address.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x0A        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length                   | Name             | Description |
|--------------------------|------------------|-------------|
| 4                        | `account`        | Account number (little endian, max 0x7FFFFFFF)) |
| 4                        | `index`          | Index number (little endian) |
| 12                       | `nonce`          | Nonce that was used to encrypt the data |
| 52 for MQS or 56 for Tor | `sender_address` | Address that will be able to decrypt the data |
| 8 for MQS or 0 for Tor   | `salt`           | Optional salt that was used to encrypt the data if the `sender_address` is an MQS address |

**Output Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

### CONTINUE_DECRYPTING_SLATE

#### Description

Decrypts the provided data using the app's internal slate state and returns it encrypted with a random AES key. The data must be provided in chunks of 64 bytes with the last chunk allowed to be less than 64 bytes.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x0B        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length        | Name             | Description |
|---------------|------------------|-------------|
| > 0 and <= 64 | `encrypted_data` | Data chunk to decrypt |

**Output Data**

| Length          | Name   | Description |
|--------------- -|--------|-------------|
| >= 16 and <= 80 | `data` | Decrypted version of the provided data chunk encrypted with a random AES key which results in the size being the size of the `encrypted_data` ceil to the next 16 byte boundary |

### FINISH_DECRYPTING_SLATE

#### Description

Returns the AES key used to encrypt the decrypted data chunks if a valid tag is provided.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x0C        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name  | Description |
|--------|-------|-------------|
| 16     | `tag` | Tag for the encrypted data |

**Output Data**

| Length | Name      | Description |
|--------|-----------|-------------|
| 32     | `aes_key` | AES key that can decrypt the data returned by the `CONTINUE_DECRYPTING_SLATE` command |

### START_TRANSACTION

#### Description

Prepares the app's internal transaction state to be able to process a transaction that will be provided later as an account at a provided index using a provided output, input, fee, and secret nonce index. The secret nonce index select which previously generated secret nonce to use when sending. An optional sender or recipient address depending on if the transaction is received or sent can be provided if this transaction contains a payment proof.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x0D        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length                               | Name                 | Description |
|--------------------------------------|----------------------|-------------|
| 4                                    | `account`            | Account number (little endian, max 0x7FFFFFFF)) |
| 4                                    | `index`              | Index number (little endian) |
| 8                                    | `output`             | Output value (little endian) |
| 8                                    | `input`              | Input value (little endian) |
| 8                                    | `fee`                | Fee value (little endian) |
| 1                                    | `secret_nonce_index` | Index of the secret nonce to use or 0 to create secret nonce (max 20) |
| 0, 52 for MQS, or 56 for Tor address | `address`            | Optional sender or recipient address of the transaction |

**Output Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

### CONTINUE_TRANSACTION_INCLUDE_OUTPUT

#### Description

Includes the output for a provided identifier, value, and switch type in the transaction in the app's internal transaction state.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x0E        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name          | Description |
|--------|---------------|-------------|
| 17     | `identifier`  | Identifier |
| 8      | `value`       | Value to commit (little endian) |
| 1      | `switch_type` | 0x01 for regular |

**Output Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

### CONTINUE_TRANSACTION_INCLUDE_INPUT

#### Description

Includes the input for a provided identifier, value, and switch type in the transaction in the app's internal transaction state.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x0F        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name          | Description |
|--------|---------------|-------------|
| 17     | `identifier`  | Identifier |
| 8      | `value`       | Value to commit (little endian) |
| 1      | `switch_type` | 0x01 for regular |

**Output Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

### CONTINUE_TRANSACTION_APPLY_OFFSET

#### Description

Applies an offset to the transaction's blinding factor in the app's internal transaction state. Returns the secret nonce index if transaction is send and doesn't have a secret nonce.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x10        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name     | Description |
|--------|----------|-------------|
| 32     | `offset` | Offset |

**Output Data**

| Length | Name                 | Description |
|--------|----------------------|-------------|
| 0 or 1 | `secret_nonce_index` | Secret nonce index for the send transaction to use |

### CONTINUE_TRANSACTION_GET_PUBLIC_KEY

#### Description

Returns the app's internal transaction state's blinding factor's public key.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x11        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

**Output Data**

| Length | Name         | Description |
|--------|--------------|-------------|
| 33     | `public_key` | Transaction's blinding factor's public key |

### CONTINUE_TRANSACTION_GET_PUBLIC_NONCE

#### Description

Returns the app's internal transaction state's public nonce.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x12        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name | Description |
|--------|------|-------------|
| 0      | N/A  | Unused |

**Output Data**

| Length | Name           | Description |
|--------|----------------|-------------|
| 33     | `public_nonce` | Public nonce |

### CONTINUE_TRANSACTION_GET_MESSAGE_SIGNATURE

#### Description

Returns the signature for a provided UTF-8 message signed with the app's internal transaction state's blinding factor.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x13        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length  | Name      | Description |
|---------|-----------|-------------|
| Varying | `message` | UTF-8 message |

**Output Data**

| Length | Name                | Description |
|--------|---------------------|-------------|
| 64     | `message_signature` | Single-signer signature |

### FINISH_TRANSACTION

#### Description

Returns the signature for the provided kernel information signed with the app's internal transaction state's blinding factor after obtaining user's approval.

A payment proof signature will be returned if receiving a payment, a `kernel_commitment` is provided, and an `address` was provided to the `START_TRANSACTION` command. In this situation, the the `address` provided to `START_TRANSACTION` will be treated as the sender's address and the `address_type` will be treated as the desired receiver's address type.

A payment proof address will be displayed if a `kernel_commitment` is provided, a `payment_proof` is provided if sending a payment, and an `address` was provided to the `START_TRANSACTION` command. In this situation, the the `address` provided to `START_TRANSACTION` will be treated as the receiver's address if sending a payment or the sender's address if receiving a payment. The `address_type` will be treated as the desired sender's address type if sending a payment or the desired receiver's address type if receiving a payment. The payment proof address displayed will be the recipient's payment proof address if sending a payment or the sender's payment proof address if receiving a payment.

If a sent transaction needs to be finalized at a later time, then the app's internal slate state can be restored by starting a transaction, including the same inputs and outputs, applying the same offset, and using the secret nonce index that was previously obtained with a `CONTINUE_TRANSACTION_APPLY_OFFSET` command.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x14        |

**Parameters**

| Parameter | Name           | Description |
|-----------|----------------|-------------|
| P1        | `address_type` | Optional 0x00 for MQS or 0x01 for Tor address that will be used if verifying or creating a payment proof |
| P2        | N/A            | Unused (must be zero) |

**Input Data**

| Length                                            | Name                      | Description |
|---------------------------------------------------|---------------------------|-------------|
| 33                                                | `public_nonce`            | Public nonce |
| 33                                                | `public_key`              | Public key |
| 1, 3, or 9                                        | `kernel_information`      | 0x00 for plain, 0x01 for coinbase, 0x02 and lock height (8 bytes, little endian) for height locked, or 0x03 and relative height (2 bytes, little endian, max 10080) |
| 0 or 33                                           | `kernel_commitment`       | Optional kernel commitment that will be used for creating or verifying a payment proof |
| 0, > 0 and <= 72 for MQS, or 64 for Tor signature | `payment_proof`           | Optional receiver's payment proof signature that will be used when verifying a payment proof

**Output Data**

| Length                                            | Name                      | Description |
|---------------------------------------------------|---------------------------|-------------|
| 64                                                | `signature`               | Single-signer signature for the transaction and kernel information |
| 0, > 0 and <= 72 for MQS, or 64 for Tor signature | `payment_proof`           | Optional receiver's payment proof signature |

### GET_MQS_CHALLENGE_SIGNATURE

#### Description

Returns the signature for a provided timestamp or hardcoded challenge signed with an account's MQS private key at a provided index after obtaining user's approval. The default challenge, `7WUDtkSaKyGRUnQ22rE3QUXChV8DmA6NnunDYP4vheTpc`, will be signed if no timestamp is provided.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x15        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length | Name               | Description |
|--------|--------------------|-------------|
| 4      | `account`          | Account number (little endian, max 0x7FFFFFFF)) |
| 4      | `index`            | Index number (little endian) |
| 0 or 8 | `timestamp`        | Optional timestamp epoch in milliseconds to sign (little endian, max 0x36EE7FFFC91567) |
| 0 or 2 | `time_zone_offset` | Optional time zone offset in minutes used when displaying the timestamp (little endian, signed, min -779, max 899) |

**Output Data**

| Length        | Name                      | Description |
|---------------|---------------------------|-------------|
| > 0 and <= 72 | `mqs_challenge_signature` | DER signature of the challenge |

### GET_LOGIN_CHALLENGE_SIGNATURE

#### Description

Returns the signature for a provided timestamp and identifier signed with an account's login private key after obtaining user's approval.

#### Encoding

**Command**

| Class | Instruction |
|-------|-------------|
| 0xC7  | 0x16        |

**Parameters**

| Parameter | Name | Description |
|-----------|------|-------------|
| P1        | N/A  | Unused (must be zero) |
| P2        | N/A  | Unused (must be zero) |

**Input Data**

| Length        | Name               | Description |
|---------------|--------------------|-------------|
| 4             | `account`          | Account number (little endian, max 0x7FFFFFFF)) |
| 8             | `timestamp`        | Timestamp epoch in milliseconds to sign (little endian, max 0x36EE7FFFC91567) |
| 2             | `time_zone_offset` | Time zone offset in minutes used when displaying the timestamp (little endian, signed, min -779, max 899) |
| > 0 and <= 64 | `identifier`       | Identifier to sign |

**Output Data**

| Length        | Name                        | Description |
|---------------|-----------------------------|-------------|
| 33            | `login_public_key`          | Public key of the private key that signed the challenge |
| > 0 and <= 72 | `login_challenge_signature` | DER signature of the challenge |

## Notes
* The app will reset its internal slate and/or transaction state when unrelated commands are requested. For example, performing a `START_TRANSACTION` command followed by a `GET_COMMITMENT` command will reset the app's internal transaction state thus requiring another `START_TRANSACTION` command to be performed before a `CONTINUE_TRANSACTION_INCLUDE_OUTPUT` command can be successfully performed.
