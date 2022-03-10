import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js"

const router = express.Router();

/**
 * @swagger
 * /api/string:
 *   get:
 *     summary: Returns random generated string
 *     responses:
 *       200:
 *         description: generated string
 *         content: text/plain; charset=utf-8
 */
router.get('/api/string', (req, res) => {
    const generatedString = uuidv4();
    return res.status(200).json(generatedString);
});

/**
 * @swagger
 * /api/check:
 *   post:
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         required: true
 *         schema:
 *             type: object
 *             properties:
 *                 nonce:
 *                     type: integer
 *                 string:
 *                     type: string
 *                 zeros:
 *                     type: integer
 *             description: Text you want to encrypt
 *     summary: Check Proof of work with string, nonce and zeros
 *     responses:
 *       200:
 *         description: encrypted string
 *         content: text/plain; charset=utf-8
 */
router.post('/api/check', (req, res) => {
    const { string, nonce, zeros } = req.body
    if (CryptoJS.SHA256(nonce + string).toString(CryptoJS.enc.Hex).slice(0, zeros).split('').some(e => e !== '0')) {
        return res.status(500).json({ status: 'error'})
    } else {
        return res.status(200).json({ status: 'success'})
    }
});

export default router;

