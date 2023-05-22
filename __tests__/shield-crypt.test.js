const ShieldCrypt = require("../index");

describe("Shield Crypt Testing", () => {

    const dummyData = "A_Dummy_Data_String";

    test("Encrypted Data Must Not Be Equal To Actual Data", () => {

        const shieldCryptInstance = new ShieldCrypt();

        const encryptedData = shieldCryptInstance.encrypt(dummyData);

        expect(() => encryptedData !== dummyData).toBeTruthy()

    });

    test("Decrypted Value Must Be Equal To The Actual Data", () => {

        const shieldCryptInstance = new ShieldCrypt();

        const encryptedData = shieldCryptInstance.encrypt(dummyData);

        const decryptedData = shieldCryptInstance.decrypt(encryptedData);

        expect(decryptedData.toString()).toEqual(dummyData);
    });

    test("Work With Custom Key And IV", () => {

        const key = "18f94f63e0b451e594630c5225533450";

        const iv = "2533b656ef3e072a";

        const shieldCryptInstance = new ShieldCrypt({
            key,
            iv
        });

        const encryptedData = shieldCryptInstance.encrypt(dummyData);

        const decryptedData = shieldCryptInstance.decrypt(encryptedData);

        expect(decryptedData.toString()).toEqual(dummyData);

        expect(shieldCryptInstance.key).toEqual(key);

        expect(shieldCryptInstance.iv).toEqual(iv);

    })

    test("With Custom CallBacks", () => {
        const shieldCryptInstance = new ShieldCrypt();

        const encryptedData = shieldCryptInstance.encrypt(dummyData, (encryptedData, rawData) => {

            // can do other operations if needed.

            return {
                data: encryptedData,
                anyOtherValue:"Any Value"
            }
        });

        expect(encryptedData).toBeInstanceOf(Object);

        expect(encryptedData.data).toBeTruthy();

        expect(encryptedData.anyOtherValue).toEqual("Any Value");

        const decryptedData = shieldCryptInstance.decrypt(encryptedData.data, (decryptedData) => {

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