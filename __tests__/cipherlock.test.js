const CipherLock = require("../index");

describe("Cipher Lock Testing", () => {

    const dummyData = "A_Dummy_Data_String";

    test("Encrypted Data Must Not Be Equal To Actual Data", () => {

        const cipherLockInstance = new CipherLock();

        const encryptedData = cipherLockInstance.encrypt(dummyData);

        expect(() => encryptedData !== dummyData).toBeTruthy()

    });

    test("Decrypted Value Must Be Equal To The Actual Data", () => {

        const cipherLockInstance = new CipherLock();

        const encryptedData = cipherLockInstance.encrypt(dummyData);

        const decryptedData = cipherLockInstance.decrypt(encryptedData);

        expect(decryptedData.toString()).toEqual(dummyData);
    });

    test("Work With Custom Key And IV", () => {

        const key = "18f94f63e0b451e594630c5225533450";

        const iv = "2533b656ef3e072a";

        const cipherLockInstance = new CipherLock({
            key,
            iv
        });

        const encryptedData = cipherLockInstance.encrypt(dummyData);

        const decryptedData = cipherLockInstance.decrypt(encryptedData);

        expect(decryptedData.toString()).toEqual(dummyData);

        expect(cipherLockInstance.key).toEqual(key);

        expect(cipherLockInstance.iv).toEqual(iv);

    })

    test("With Custom CallBacks", () => {
        const cipherLockInstance = new CipherLock();

        const encryptedData = cipherLockInstance.encrypt(dummyData, (encryptedData, rawData) => {

            // can do other operations if needed.

            return {
                data: encryptedData,
                anyOtherValue:"Any Value"
            }
        });

        expect(encryptedData).toBeInstanceOf(Object);

        expect(encryptedData.data).toBeTruthy();

        expect(encryptedData.anyOtherValue).toEqual("Any Value");

        const decryptedData = cipherLockInstance.decrypt(encryptedData.data, (decryptedData) => {

            // can do other operations if needed.

            return {
                data: encryptedData,
                anyOtherValue:"Decrypted Data"
            }

        });

        expect(decryptedData).toBeInstanceOf(Object);

        expect(decryptedData.data).toBeTruthy();

        expect(decryptedData.anyOtherValue).toEqual("Decrypted Data");

    })

})