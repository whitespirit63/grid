import { gostEngine } from 'node-gost-crypto';

export const streebog = (str) => {
    const buffer = Buffer.from(str);
    const digest = gostEngine.getGostDigest({
        name: 'GOST R 34.11',
        length: 256,
        version: 1994,
    });
    return Buffer.from(digest.digest(buffer)).toString('hex');
};

