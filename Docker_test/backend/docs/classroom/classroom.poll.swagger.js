/**
 * @swagger
 * /classrooms/polls:
 *  get:
 *     summary: [Poll] 이번 주 강의실 개방 Poll 현황 조회
 *     tags: [Classroom]
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema: { type: string, format: date }
 *         description: 주 시작일 (예: 2025-09-15)
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema: { type: string, format: date }
 *         description: 주 종료일 (예: 2025-09-21)
 *     responses:
 *       200:
 *         description: Poll 현황
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   poll_id: { type: string, example: "P001" }
 *                   grade: { type: string, example: "1학년" }
 *                   building: { type: string, example: "본관" }
 *                   room_number: { type: string, example: "404" }
 *                   poll_date: { type: string, example: "2025-09-20" }
 *                   target_weekend: { type: string, example: "토요일" }
 *                   required_count: { type: integer, example: 8 }
 *                   joined_count: { type: integer, example: 10 }
 *
 *   post:
 *     summary: [Poll] 강의실 개방 Poll 생성
 *     tags: [Classroom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade_id: { type: integer, example: 1 }
 *               classroom_id: { type: string, example: "101" }
 *               poll_date: { type: string, example: "2025-09-20" }
 *               target_weekend: { type: string, example: "토요일" }
 *               required_count: { type: integer, example: 8 }
 *     responses:
 *       200:
 *         description: Poll 생성 완료
 */

/**
 * @swagger
 * /classrooms/polls/{poll_id}:
 *   get:
 *     summary: [Poll] 특정 Poll 상세 조회
 *     tags: [Classroom]
 *     parameters:
 *       - in: path
 *         name: poll_id
 *         required: true
 *         schema: { type: string }
 *         description: Poll 고유 ID
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema: { type: string }
 *         description: 조회하는 사용자 ID (투표 여부 체크용)
 *     responses:
 *       200:
 *         description: Poll 상세
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 poll_id: { type: string, example: "P001" }
 *                 grade: { type: string, example: "1학년" }
 *                 building: { type: string, example: "본관" }
 *                 room_number: { type: string, example: "404" }
 *                 poll_date: { type: string, example: "2025-09-20" }
 *                 target_weekend: { type: string, example: "토요일" }
 *                 required_count: { type: integer, example: 8 }
 *                 joined_count: { type: integer, example: 5 }
 *                 already_voted: { type: boolean, example: true }
 *
 * /classrooms/polls/{poll_id}/vote:
 *   post:
 *     summary: [Poll] Poll 투표 참여
 *     tags: [Classroom]
 *     parameters:
 *       - in: path
 *         name: poll_id
 *         required: true
 *         schema: { type: string }
 *         description: Poll 고유 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string, example: "U001" }
 *     responses:
 *       200:
 *         description: 투표 완료
 */
