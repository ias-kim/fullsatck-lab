/**
 * @swagger
 * /modal/schedule/{course_id}:
 *   get:
 *     summary: 특정 과목의 시간표 조회
 *     tags: [Modal - Timetable]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 특정 과목 시간표
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   schedule_id: { type: string, example: "SCH1" }
 *                   course_id: { type: string, example: "C001" }
 *                   title: { type: string, example: "인공지능 개론" }
 *                   day_of_week: { type: string, example: "월" }
 *                   start_time: { type: string, example: "09:00:00" }
 *                   end_time: { type: string, example: "09:50:00" }
 *                   building: { type: string, example: "본관" }
 *                   room_number: { type: string, example: "101" }
 */
