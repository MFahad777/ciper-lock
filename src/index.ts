/**
 * Importing Built In Library
 */
import crypto, { Cipher } from "crypto";

import IConstructorObject from "./declaration/object";

class Index {
    private algorithm: string;
    private key: string | Buffer;
    private iv: string | Buffer;

    constructor(data: IConstructorObject = {}) {

        let { algorithm = "aes-256-ctr", key = null, iv = null } = data;

        // If not passing key and Iv
        if (!key || !iv) {

            const generatedKeys = Index.generateKeyIv();

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

    get getKey() {
        return this.key
    }

    get getIV() {
        return this.iv
    }

    /**
     * Generate Key and IV
     *
     * @param {boolean} [toHex] Set to true if you require hex of key and iv
     *
     * @returns {{iv: Buffer | string, key: Buffer | string}}
     */
    static generateKeyIv(toHex: boolean = false) {

        const iv : Buffer = crypto.randomBytes(16);

        const key : Buffer = crypto
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
    encrypt(data : string, callback? : Function) {

        const cipher : Cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

        const encrypted : Buffer = Buffer.concat([cipher.update(data), cipher.final()]);

        const encryptedData : string = encrypted.toString('hex');

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
    decrypt(encryptedData : string, callback? : Function) {

        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);

        if (callback) {
            return callback(decrypted, encryptedData);
        }

        return decrypted;

    }
}

export = Index