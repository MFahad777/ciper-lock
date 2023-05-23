/**
 * Importing Built In Library
 */
const crypto = require("crypto");

/**
 * Importing Local Libraries
 */

class ShieldCrypt {

    constructor(data = {}) {

        let { algorithm = "aes-256-ctr", key = null, iv = null } = data;

        // If not passing key and Iv
        if (!key || !iv) {

            const generatedKeys = ShieldCrypt.generateKeyIv();

            key = generatedKeys.key;
            iv = generatedKeys.iv;
        }

        this.algorithm = algorithm;

        this.key = typeof key === "string"
            ? Buffer.from(key,'hex')
            : key;

        this.iv = typeof iv === "string"
            ? Buffer.from(iv,'hex')
            : iv;
    }

    /**
     * Generate Key and IV
     *
     * @param {boolean} [toHex] Set to true if you require hex of key and iv
     *
     * @returns {{iv: Buffer | string, key: Buffer | string}}
     */
    static generateKeyIv(toHex = false) {

        const iv = crypto.randomBytes(16);

        const key = crypto
            .createHash('sha256')
            .update(String(iv))
            .digest();

        return {
            key : toHex ? key.toString('hex') : key,
            iv : toHex ? iv.toString('hex') : iv
        }
    }

    /**
     * Encrypt provided data
     *
     * @param {string} data
     * @param {function} [callback] Optional Callback function
     */
    encrypt(data,callback) {

        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

        const encryptedData = encrypted.toString('hex');

        if (callback) {
            return callback(encrypted, data);
        }

        return encryptedData;
    }

    /**
     * Decrypt Encrypted Data
     *
     * @param {string} encryptedData
     * @param {function} [callback] Optional function
     */
    decrypt(encryptedData, callback) {

        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);

        if (callback) {
            return callback(decrypted, encryptedData);
        }

        return decrypted;

    }
}

module.exports = ShieldCrypt