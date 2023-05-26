# ShieldCrypt

ShieldCrypt is a npm package for encryption and decryption using the Node.js built-in `crypto` library.

## Installation
To install ShieldCrypt, use npm:

```shell
npm install shield-crypt
```

## Usage

### Importing ShieldCrypt

First, you need to import the ShieldCrypt module:

```javascript
const ShieldCrypt = require('shield-crypt');
```

## Creating an instance

You can create a new instance of ShieldCrypt by providing an optional configuration object. If no configuration is provided, it will generate a random key and IV for you.

```javascript
// Without configuration
const shieldCryptInstance = new ShieldCrypt();

// With custom configuration
const shieldCryptInstance = new ShieldCrypt({
    algorithm: 'aes-256-cbc', // Optional: encryption algorithm, default is aes-256-ctr
    key: 'mySecretKey', // Optional: encryption key
    iv: 'myInitializationVector' // Optional: initialization vector
});
```

You can generate a key and iv and store it in a config or .env file.

```javascript
const ShieldCrypt = require('shield-crypt');

const { key, iv } = ShieldCrypt.generateKeyIv(true); // Pass true if require hexadecimal values

console.log(key); 
// 35a1896c975f5572f6a3afd7d992fea6c9f3812a488a98ce9930ea0b7bca5e66

console.log(iv); 
// af78d78b5d3bcbe4b1497b84fa8a4b27

// Pass the generated key and iv to the constructor
const shieldCryptInstance = new ShieldCrypt({
    key,
    iv
});
```

### Encrypting Data
To encrypt data, call the encrypt method on the ShieldCrypt instance. You can provide a callback function to handle the encrypted data asynchronously.

```javascript
const data = 'Hello, world!';
const encryptedData = shieldCryptInstance.encrypt(data);
console.log(encryptedData);
// Output: Encrypted data in hexadecimal format
```
### Decrypting Data
To decrypt previously encrypted data, call the decrypt method on the ShieldCrypt instance. You can provide a callback function to handle the decrypted data asynchronously.

```javascript
const encryptedData = '...'; // Encrypted data obtained from previous encryption
const decryptedData = shieldCryptInstance.decrypt(encryptedData);
console.log(decryptedData.toString());
// Output: Decrypted data as a string
```

