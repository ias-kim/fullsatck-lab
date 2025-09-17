CREATE OR REPLACE VIEW v_cleaning_roster AS
SELECT
    ca.assignment_id,
    ca.work_date,
    ca.classroom_id,
    ca.grade_id,
    c.building,
    c.room_number,
    ca.members_json
FROM cleaning_assignment ca
         LEFT JOIN classroom c ON ca.classroom_id = c.classroom_id;

-- 이 쿼리는 개념을 설명하기 위한 예시입니다.
-- 1. 'G1' 학년의 'active' 상태인 학생들을 랜덤으로 섞음


-- members_json: ["U0001","U0002", ...] 라고 가정
CREATE OR REPLACE VIEW v_cleaning_members AS
SELECT
    ca.sec_id,
    ca.assignment_id,
    ca.work_date,
    ca.classroom_id,
    c.building,
    c.room_number,
    jt.user_id,
    ua.name AS user_name
FROM cleaning_assignment ca
         LEFT JOIN classroom c ON c.classroom_id = ca.classroom_id
         JOIN JSON_TABLE(ca.members_json, '$[*]' COLUMNS (
    user_id CHAR(10) PATH '$'
)) jt
         LEFT JOIN user_account ua ON ua.user_id = jt.user_id;

ALTER TABLE cleaning_assignment
    ADD KEY ix_ca_date_room (work_date, classroom_id),
  ADD KEY ix_ca_status    (status);