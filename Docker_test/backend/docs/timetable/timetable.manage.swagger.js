/**
 * @swagger
 * tags:
 *   - name: Timetable
 *     description: 시간표 API (정규 / 특강 / 한국어 / 휴·보강)

 */

/**
 * @swagger
 * /timetable/regular:
 *   post:
 *     summary: 정규 시간표 등록
 *     tags: [Timetable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string, example: "C001" }
 *               grade_id: { type: integer, example: 2 }
 *               classroom_id: { type: string, example: "101" }
 *               day_of_week: { type: string, example: "월" }
 *               time_slot_id: { type: string, example: "1" }
 *     responses:
 *       200: { description: 등록 완료 }
 *
 * /timetable/regular/{id}:
 *   put:
 *     summary: 정규 시간표 수정
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classroom_id: { type: string, example: "102" }
 *               day_of_week: { type: string, example: "화" }
 *               time_slot_id: { type: string, example: "2" }
 *     responses:
 *       200: { description: 수정 완료 }
 *
 *   delete:
 *     summary: 정규 시간표 삭제
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: 삭제 완료 }
 */

/**
 * @swagger
 * /timetable/special:
 *   post:
 *     summary: 특강 시간표 등록
 *     tags: [Timetable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string, example: "SP001" }
 *               level_id: { type: integer, example: 1 }
 *               class_id: { type: integer, example: 2 }
 *               language_id: { type: string, example: "JP" }
 *               classroom_id: { type: string, example: "201" }
 *               day_of_week: { type: string, example: "수" }
 *               time_slot_id: { type: string, example: "3" }
 *     responses:
 *       200: { description: 등록 완료 }
 *
 * /timetable/special/{id}:
 *   put:
 *     summary: 특강 시간표 수정
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classroom_id: { type: string, example: "202" }
 *               day_of_week: { type: string, example: "목" }
 *               time_slot_id: { type: string, example: "4" }
 *     responses:
 *       200: { description: 수정 완료 }
 *
 *   delete:
 *     summary: 특강 시간표 삭제
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: 삭제 완료 }
 */

/**
 * @swagger
 * /timetable/korean:
 *   post:
 *     summary: 한국어 시간표 등록
 *     tags: [Timetable]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string, example: "K001" }
 *               level_id: { type: integer, example: 5 }
 *               classroom_id: { type: string, example: "301" }
 *               day_of_week: { type: string, example: "금" }
 *               time_slot_id: { type: string, example: "2" }
 *     responses:
 *       200: { description: 등록 완료 }
 *
 * /timetable/korean/{id}:
 *   put:
 *     summary: 한국어 시간표 수정
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classroom_id: { type: string, example: "302" }
 *               day_of_week: { type: string, example: "월" }
 *               time_slot_id: { type: string, example: "1" }
 *     responses:
 *       200: { description: 수정 완료 }
 *
 *   delete:
 *     summary: 한국어 시간표 삭제
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: 삭제 완료 }
 */
