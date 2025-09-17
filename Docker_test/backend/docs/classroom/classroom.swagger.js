/**
 * @swagger
 * /classrooms:
 *   get:
 *     summary: 강의실 목록 조회
 *     tags: [Classroom]
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
 *                   room_type: { type: string, example: "강의실" }
 *   post:
 *     summary: 강의실 등록
 *     tags: [Classroom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               building: { type: string, example: "본관" }
 *               room_number: { type: string, example: "404" }
 *               room_type: { type: string, example: "수업" }
 *     responses:
 *       200:
 *         description: 등록 완료
 */

/**
 * @swagger
 * /classrooms/{id}:
 *   put:
 *     summary: 강의실 수정
 *     tags: [Classroom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               building: { type: string, example: "신관" }
 *               room_number: { type: string, example: "302" }
 *               room_type: { type: string, example: "회의" }
 *     responses:
 *       200:
 *         description: 수정 완료
 *
 *   delete:
 *     summary: 강의실 삭제
 *     tags: [Classroom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: 삭제 완료
 */

/**
 * @swagger
 * /classrooms/purposes:
 *   get:
 *     summary: 강의실 사용 목적 목록 조회
 *     tags: [Classroom]
 *     responses:
 *       200:
 *         description: 목적 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   purpose: { type: string, example: "수업" }
 */
