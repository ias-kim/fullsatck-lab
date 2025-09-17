/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: 관리자 사용자 승인
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: 승인대기 계정 출력
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   role_type: { type: string }
 *                   name: { type: string }
 *                   email: { type: string }
 *                   phone: { type: string }
 *                   is_international: { type: boolean }
 *                   language_id: { type: string }
 *                   professor_id: { type: string }
 *             example:
 *               - id: 1
 *                 role_type: student
 *                 name: 김성식
 *                 email: abc@gmail.com
 *                 phone: 010-4628-5981
 *                 is_international: true
 *                 language_id: JLPT3
 *               - id: 2
 *                 role_type: professor
 *                 name: 김교수
 *                 email: abcd@gmail.com
 *                 phone: 010-1234-5678
 *                 professor_id: P001
 *   post:
 *     summary: 사용자 승인 처리
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string, example: "2423001" }
 *     responses:
 *       200:
 *         description: 승인 완료
 *
 * /admin/users/{id}:
 *   delete:
 *     summary: 사용자 삭제
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 삭제 완료
 */

/**
 * @swagger
 * /admin/email:
 *   get:
 *     summary: 예외 이메일 관리
 *     tags: [Admin]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   email: { type: string }
 *                   reason: { type: string }
 *             example:
 *              - id: 1
 *                email: aaa@gmail.com
 *                reason: 김순애 교수님 계정
 *   post:
 *     summary: 예외 이메일 등록
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "ccc@gmail.com" }
 *               reason: { type: string, example: "교수 연구용" }
 *     responses:
 *       200:
 *         description: 등록 완료
 *
 * /admin/email/{id}:
 *   delete:
 *     summary: 예외 이메일 삭제
 *     tags: [Admin]
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
 * /admin/students:
 *   get:
 *     summary: 학생 정보 관리
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: grade_id
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3]
 *         description: 학년 (1=1학년, 2=2학년, 3=3학년)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [재학, 휴학, 자퇴, 졸업]
 *         description: 학생 상태
 *     responses:
 *       200:
 *         description: 조건에 맞는 학생 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   grade_id: { type: integer }
 *                   user_id: { type: string }
 *                   name: { type: string }
 *                   email: { type: string }
 *                   phone: { type: string }
 *                   status: { type: string }
 *                   language_id: { type: string }
 *                   level_class: { type: string }
 *             example:
 *               - id: 1
 *                 grade_id: 1
 *                 user_id: 2423001
 *                 name: 권혁일
 *                 email: aaa@gmail.com
 *                 phone: 010-1111-1111
 *                 status: 재학
 *                 language_id: JLPTN1
 *                 level_class: A
 *               - id: 2
 *                 grade_id: 2
 *                 user_id: 2423002
 *                 name: 김성식
 *                 email: bbb@gmail.com
 *                 phone: 010-2222-2222
 *                 status: 휴학
 *                 language_id: JLPTN2
 *                 level_class: B
 *   put:
 *     summary: 학생 정보 수정
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string, example: "2423001" }
 *               grade_id: { type: integer, example: 2 }
 *               status: { type: string, example: "휴학" }
 *               language_id: { type: string, example: "JLPTN3" }
 *               level_class: { type: string, example: "B" }
 *     responses:
 *       200:
 *         description: 수정 완료
 *
 * /admin/students/{id}:
 *   delete:
 *     summary: 학생 삭제
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 삭제 완료
 */
