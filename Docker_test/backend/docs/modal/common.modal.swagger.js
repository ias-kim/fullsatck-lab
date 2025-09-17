/**
 * @swagger
 * /modal/sections:
 *   get:
 *     summary: 학기 목록 조회
 *     tags: [Modal - Common]
 *     responses:
 *       200:
 *         description: 학기 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sec_id: { type: string, example: "2025-1" }
 *                   label: { type: string, example: "2025-1" }
 */

/**
 * @swagger
 * /modal/professors:
 *   get:
 *     summary: 교수 목록 조회
 *     tags: [Modal - Common]
 *     responses:
 *       200:
 *         description: 교수 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id: { type: string, example: "P001" }
 *                   name: { type: string, example: "이교수" }
 */

/**
 * @swagger
 * /modal/classrooms:
 *   get:
 *     summary: 강의실 목록 조회
 *     tags: [Modal - Common]
 *     responses:
 *       200:
 *         description: 강의실 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   classroom_id: { type: string, example: "101" }
 *                   building: { type: string, example: "본관" }
 *                   room_number: { type: string, example: "101" }
 */

/**
 * @swagger
 * /modal/timeslots:
 *   get:
 *     summary: 교시 목록 조회
 *     tags: [Modal - Common]
 *     responses:
 *       200:
 *         description: 교시 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   time_slot_id: { type: string, example: "1" }
 *                   start_time: { type: string, example: "09:00:00" }
 *                   end_time: { type: string, example: "09:50:00" }
 */

/**
 * @swagger
 * /modal/days:
 *   get:
 *     summary: 요일 목록 조회
 *     tags: [Modal - Common]
 *     responses:
 *       200:
 *         description: 요일 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   day_of_week: { type: string, example: "월" }
 */
