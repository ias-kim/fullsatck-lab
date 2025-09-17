/**
 * @swagger
 * tags:
 *   - name: Timetable
 *     description: 휴‧보강 이벤트 관리 API
 */

/**
 * @swagger
 * /timetable/events:
 *   post:
 *     summary: 휴‧보강 등록
 *     tags: [Timetable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string, example: "C001" }
 *               event_type: { type: string, enum: [휴강, 보강], example: "휴강" }
 *               event_date: { type: string, format: date, example: "2025-09-20" }
 *               time_slot_id: { type: string, example: "2" }
 *     responses:
 *       200: { description: 이벤트 등록 완료 }
 *
 * /timetable/events/{id}:
 *   delete:
 *     summary: 휴‧보강 취소
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: 이벤트 삭제 완료 }
 */
