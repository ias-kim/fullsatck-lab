/**
 * @swagger
 * /modal/courses/regular:
 *   get:
 *     summary: 정규 과목 목록 조회
 *     tags: [Modal - Subjects]
 *     responses:
 *       200:
 *         description: 정규 과목 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   course_id: { type: string, example: "C001" }
 *                   title: { type: string, example: "인공지능 개론" }
 *                   grade_id: { type: string, example: "2" }
 */

/**
 * @swagger
 * /modal/courses/special:
 *   get:
 *     summary: 특강 과목 목록 조회
 *     tags: [Modal - Subjects]
 *     responses:
 *       200:
 *         description: 특강 과목 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   course_id: { type: string, example: "SP001" }
 *                   title: { type: string, example: "JLPT 특강" }
 *                   level_id: { type: string, example: "1" }
 *                   level_name: { type: string, example: "JLPT N1" }
 *                   class_id: { type: string, example: "1" }
 *                   class_name: { type: string, example: "A" }
 */

/**
 * @swagger
 * /modal/courses/korean:
 *   get:
 *     summary: 한국어 과목 목록 조회
 *     tags: [Modal - Subjects]
 *     responses:
 *       200:
 *         description: 한국어 과목 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   course_id: { type: string, example: "K001" }
 *                   title: { type: string, example: "TOPIK 대비 한국어" }
 *                   level_id: { type: string, example: "5" }
 *                   level_name: { type: string, example: "TOPIK 6급" }
 */

/**
 * @swagger
 * /modal/courses/all:
 *   get:
 *     summary: 전체 과목 목록 조회 (정규 + 특강 + 한국어)
 *     tags: [Modal - Subjects]
 *     responses:
 *       200:
 *         description: 전체 과목 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   course_id: { type: string, example: "C001" }
 *                   title: { type: string, example: "인공지능 개론" }
 *                   type: { type: string, example: "정규/특강/한국어" }
 */
