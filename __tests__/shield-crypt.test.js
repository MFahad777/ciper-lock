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

        const key = "35a1896c975f5572f6a3afd7d992fea6c9f3812a488a98ce9930ea0b7bca5e66";

        const iv = "af78d78b5d3bcbe4b1497b84fa8a4b27";

        const shieldCryptInstance = new ShieldCrypt({
            key,
            iv
        });

        const encryptedData = shieldCryptInstance.encrypt(dummyData);

        const decryptedData = shieldCryptInstance.decrypt(encryptedData);

        expect(decryptedData.toString()).toEqual(dummyData);

        expect(shieldCryptInstance.key.toString('hex')).toEqual(key);

        expect(shieldCryptInstance.iv.toString('hex')).toEqual(iv);

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

    test("Generate Key And Iv", () => {

        const { key , iv } = ShieldCrypt.generateKeyIv();

        expect(key).toBeTruthy();

        expect(iv).toBeTruthy();
    })

    test("Encrypt/ Decrypt With Generated Key and Iv",() => {

        const { key , iv } = ShieldCrypt.generateKeyIv(true);

        const shieldCryptInstance = new ShieldCrypt({
            key,
            iv
        })

        const encryptedData = shieldCryptInstance.encrypt(dummyData);

        const decryptedData = shieldCryptInstance.decrypt(encryptedData);

        expect(encryptedData).not.toEqual(dummyData);

        expect(decryptedData.toString()).toEqual(dummyData);

    })

})