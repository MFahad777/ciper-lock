# CryptoLock

CryptoLock is a npm package for encryption and decryption using the Node.js built-in `crypto` library.

## Installation
To install CryptoLock, use npm:

```shell
npm install crypto-lock
```

## Usage

### Importing CryptoLock

First, you need to import the CryptoLock module:

```javascript
const CryptoLock = require('crypto-lock');
```

## Creating an instance

You can create a new instance of CryptoLock by providing an optional configuration object. If no configuration is provided, it will generate a random key and IV for you.

```javascript
// Without configuration
const cryptoInstance = new CryptoLock();

// With custom configuration
const cryptoInstance = new CryptoLock({
algorithm: 'aes-256-cbc', // Optional: encryption algorithm, default is aes-256-ctr
key: 'mySecretKey', // Optional: encryption key
iv: 'myInitializationVector' // Optional: initialization vector
});
```

### Encrypting Data
To encrypt data, call the encrypt method on the CryptoLock instance. You can provide a callback function to handle the encrypted data asynchronously.

```javascript
const data = 'Hello, world!';
const encryptedData = cryptoInstance.encrypt(data);
console.log(encryptedData);
// Output: Encrypted data in hexadecimal format
```
### Decrypting Data
To decrypt previously encrypted data, call the decrypt method on the CryptoLock instance. You can provide a callback function to handle the decrypted data asynchronously.

```javascript
const encryptedData = '...'; // Encrypted data obtained from previous encryption
const decryptedData = cryptoInstance.decrypt(encryptedData);
console.log(decryptedData.toString());
// Output: Decrypted data as a string
```

