import express from 'express';
import { streebog } from '../gost.js';
import { sha256 } from '../sha256.js';

const router = express.Router();

/**
 * @swagger
 * /api/sha256/{text}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Text you want to encrypt
 *     summary: Returns hash encrypted with sha256
 *     responses:
 *       200:
 *         description: encrypted string
 *         content: text/plain; charset=utf-8
 */
router.get('/api/sha256/:text', (req, res) => {
    return res.status(200).json(sha256(req.params.text));
});

/**
 * @swagger
 * /api/streebog/{text}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Text you want to encrypt
 *     summary: Returns hash encrypted with streebog
 *     responses:
 *       200:
 *         description: encrypted string
 *         content: text/plain; charset=utf-8
 */
router.get('/api/streebog/:text', (req, res) => {
    return res.status(200).json(streebog(req.params.text));
});

export default router
