/**
 * @swagger
 * /classrooms/{classroom_id}/reservations:
 *   get:
 *     summary: 강의실 이번 주 예약 현황 조회
 *     tags: [Classroom - Reservation]
 *     parameters:
 *       - in: path
 *         name: classroom_id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: 예약 현황 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reservation_id: { type: string, example: "R001" }
 *                   name: { type: string, example: "김성식" }
 *                   title: { type: string, example: "스터디 모임" }
 *                   start_at: { type: string, example: "2025-09-17 10:00:00" }
 *                   end_at: { type: string, example: "2025-09-17 12:00:00" }
 *                   status: { type: string, example: "ACTIVE" }
 *
 *   post:
 *     summary: 강의실
 *     tags: [Classroom - Reservation]
 *     parameters:
 *       - in: path
 *         name: classroom_id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string, example: "U001" }
 *               title: { type: string, example: "스터디 모임" }
 *               start_at: { type: string, example: "2025-09-17 10:00:00" }
 *               end_at: { type: string, example: "2025-09-17 12:00:00" }
 *     responses:
 *       200:
 *         description: 예약 완료
 */

/**
 * @swagger
 * /classrooms/reservations/{reservation_id}:
 *   delete:
 *     summary: 예약 취소
 *     tags: [Classroom - Reservation]
 *     parameters:
 *       - in: path
 *         name: reservation_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 예약 취소 완료
 */
