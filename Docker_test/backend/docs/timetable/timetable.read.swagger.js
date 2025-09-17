/**
 * @swagger
 * tags:
 *   - name: Timetable
 *     description: 시간표 API (학생/교수/관리자 구분)
 */

/**
 * @swagger
 * /timetable/student/{user_id}:
 *   get:
 *     summary: 학생 시간표 조회 (주간)
 *     description: |
 *       특정 학생의 주간 시간표를 조회합니다.  
 *       - 정규 수업 → 학생 학년 기준  
 *       - 특강 → 학생 레벨 + 언어 기준  
 *       - 한국어 → 유학생만 허용  
 *       - 주간 범위는 `week_start`, `week_end` 쿼리 파라미터로 지정
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 학생 사용자 ID
 *       - in: query
 *         name: week_start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: "주 시작일 (예: 2025-09-15)"
 *       - in: query
 *         name: week_end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: "주 종료일 (예: 2025-09-21)"
 *     responses:
 *       200:
 *         description: 주간 시간표 데이터
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Timetable"
 */


/**
 * @swagger
 * /timetable/professor/{user_id}:
 *   get:
 *     summary: 교수 시간표 조회 (주간)
 *     description: |
 *       특정 교수의 주간 시간표를 조회합니다.  
 *       - 본인이 담당하는 과목만 표시  
 *       - 주간 범위는 `week_start`, `week_end` 쿼리 파라미터로 지정
 *     tags: [Timetable]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 교수 사용자 ID
 *       - in: query
 *         name: week_start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: week_end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: 주간 시간표 데이터
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Timetable"
 */

/**
 * @swagger
 * /timetable/admin:
 *   get:
 *     summary: 전체 시간표 조회 (주간)
 *     description: |
 *       관리자가 전체 시간표를 주간 단위로 조회합니다.  
 *       - 모든 학년, 특강, 한국어 포함  
 *       - 주간 범위는 `week_start`, `week_end` 쿼리 파라미터로 지정
 *     tags: [Timetable]
 *     parameters:
 *       - in: query
 *         name: week_start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: week_end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: 주간 시간표 데이터
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Timetable"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Timetable:
 *       type: object
 *       properties:
 *         course_id:
 *           type: string
 *           example: "C001"
 *         course_title:
 *           type: string
 *           example: "인공지능 개론"
 *         year:
 *           type: integer
 *           example: 2025
 *         semester:
 *           type: integer
 *           example: 1
 *         day_of_week:
 *           type: string
 *           example: "월"
 *         start_time:
 *           type: string
 *           format: time
 *           example: "09:00:00"
 *         end_time:
 *           type: string
 *           format: time
 *           example: "09:50:00"
 *         building:
 *           type: string
 *           example: "본관"
 *         room_number:
 *           type: string
 *           example: "101"
 *         professor_name:
 *           type: string
 *           example: "이교수"
 *         grade_name:
 *           type: string
 *           example: "2학년"
 *         level_name:
 *           type: string
 *           example: "JLPT N2"
 *         language_name:
 *           type: string
 *           example: "한국어"
 *         class_group:
 *           type: string
 *           example: "A"
 *         is_special:
 *           type: boolean
 *           example: false
 *         event_status:
 *           type: string
 *           enum: [휴강, 보강]
 *           example: "휴강"
 *         event_date:
 *           type: string
 *           format: date
 *           example: "2025-04-15"
 */
