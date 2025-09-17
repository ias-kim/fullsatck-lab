/**
 * @swagger
 * /modal/levels:
 *   get:
 *     summary: 레벨 목록 조회
 *     tags: [Modal - Subjects]
 *     responses:
 *       200:
 *         description: 레벨 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   level_id: { type: string, example: "1" }
 *                   name: { type: string, example: "JLPT N1" }
 */

/**
 * @swagger
 * /modal/classes/{level_id}:
 *   get:
 *     summary: 선택한 레벨의 반 목록 조회
 *     tags: [Modal - Subjects]
 *     parameters:
 *       - in: path
 *         name: level_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 반 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   class_id: { type: string, example: "1" }
 *                   name: { type: string, example: "A" }
 */
