/**
 * @swagger
 * /modal/levels/korean:
 *   get:
 *     summary: 한국어 레벨 목록 조회 (TOPIK 계열)
 *     tags: [Modal - Subjects]
 *     responses:
 *       200:
 *         description: 한국어 레벨 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   level_id: { type: string, example: "5" }
 *                   name: { type: string, example: "TOPIK 6급" }
 */
