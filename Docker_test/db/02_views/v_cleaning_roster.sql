CREATE OR REPLACE VIEW v_cleaning_roster AS
SELECT
    ca.assignment_id,
    ca.work_date,
    ca.grade_id,
    c.building,
    c.room_number,
    ca.members_json
FROM cleaning_assignment ca
         LEFT JOIN classroom c ON ca.classroom_id = c.classroom_id;

-- 이 쿼리는 개념을 설명하기 위한 예시입니다.
-- 1. 'G1' 학년의 'active' 상태인 학생들을 랜덤으로 섞음
