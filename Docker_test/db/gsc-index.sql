-- user_account: 상태/역할로 필터링 + 이름/메일 검색 대비
ALTER TABLE user_account
    ADD KEY ix_user_status_role (status, role_type),
  ADD KEY ix_user_name (name);

-- student_entity: 반/상태/언어로 조회, 학년-반 통계
ALTER TABLE student_entity
    ADD KEY ix_student_class_status (class_id, status),
  ADD KEY ix_student_grade_class (grade_id, class_id),
  ADD KEY ix_student_lang (language_id);

-- kakao_user: kakao_id는 UNIQUE OK, 사용자 기준 역조회도 빈번하면(마이페이지 등) PK로 충분

-- section: 연도/학기 조회는 UNIQUE로 이미 커버
-- time_slot: (start_time, end_time) UNIQUE로 커버

-- classroom: 건물/호수 UNIQUE로 커버

-- course: 학기별/제목 검색
ALTER TABLE course
    ADD KEY ix_course_sec (sec_id),
  ADD KEY ix_course_special (is_special);

-- course_schedule: 위의 신규 정의로 충분

-- course_language: 언어별 강의 리스트
ALTER TABLE course_language
    ADD KEY ix_course_language_lang (language_id);

-- course_student, course_professor: 과목 기준 listing 최적화
ALTER TABLE course_student
    ADD KEY ix_cs_course (course_id);     -- PK는 (user_id, course_id)
ALTER TABLE course_professor
    ADD KEY ix_cp_course (course_id);

-- file_assets: 업로드 최신순
ALTER TABLE file_assets
    ADD KEY ix_file_uploaded (uploaded_at);

-- notice: 코스/최신순은 기존 (course_id, created_at)으로 OK
-- 전체 공지 최신순이 많다면 created_at 단일 인덱스도 추가
ALTER TABLE notice
    ADD KEY ix_notice_created (created_at);

-- notice_file: notice_id 선행 조인
ALTER TABLE notice_file
    ADD KEY ix_nf_notice (notice_id),
  ADD KEY ix_nf_file (file_id);

-- notice_target: 현재 모델 유지 시 notice_id 선행 인덱스는 UNIQUE로 커버됨.
-- 학생 속성과 매칭용 보조 인덱스(부분 일치) 추가
ALTER TABLE notice_target
    ADD KEY ix_nt_grade (grade_id),
  ADD KEY ix_nt_level (level_id),
  ADD KEY ix_nt_lang (language_id);

-- notification_delivery_notice / event: 이미 잘 잡혀 있음(inbox 인덱스)
-- course_event: 날짜/스케줄 조회는 이미 인덱스 보유
ALTER TABLE course_event
    ADD KEY ix_event_schedule (schedule_id);

-- log_entity: (user_id, action, event_time) 존재 -> OK
-- student_exams: 시험종류/레벨 집계, 사용자별 최신
ALTER TABLE student_exams
    ADD KEY ix_exam_user (user_id),
  ADD KEY ix_exam_type_level (exam_type, level_id);

-- reservation: 시간 겹침 체크용, 한 번 더 다듬기
--   검색 패턴: 특정 강의실에서 (start_at < :end) AND (end_at > :start)
--   인덱스: (classroom_id, start_at)만으로도 효과 있으나, 아래 복합으로 개선
ALTER TABLE reservation
DROP KEY ux_start, DROP KEY ux_end,
  ADD KEY ix_resv_room_start_end (classroom_id, start_at, end_at),
  ADD KEY ix_resv_user_time (user_id, start_at);

-- weekend_attendance_poll: 방/날짜/요일 UNIQUE로 OK. 학년 필터링 보조
ALTER TABLE weekend_attendance_poll
    ADD KEY ix_poll_grade_date (grade_id, poll_date);

-- weekend_attendance_votes: poll_id 선행 UNIQUE로 OK, 사용자 히스토리
ALTER TABLE weekend_attendance_votes
    ADD KEY ix_votes_user (user_id);

-- cleaning_assignment: 학년/날짜 집계 및 반별 조회
ALTER TABLE cleaning_assignment
    ADD KEY ix_cleaning_grade_date (grade_id, work_date),
  ADD KEY ix_cleaning_room_date (classroom_id, work_date);
-- 학생에게 노출되는 공지 찾기 (예시)
WHERE (grade_id IS NULL OR grade_id = :student_grade)
  AND (level_id IS NULL OR level_id = :student_level)
  AND (language_id IS NULL OR language_id = :student_lang)