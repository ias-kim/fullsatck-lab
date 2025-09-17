-- 학기-과목-반(시간표)까지 식별되는 개체
CREATE OR REPLACE VIEW v_course_offering AS
SELECT
    cs.schedule_id,              -- 개설(오퍼링) PK처럼 사용
    cs.sec_id,                   -- 학기
    cs.course_id,
    c.title AS course_title,
    cs.classroom_id,
    ts.start_time, ts.end_time,
    cs.day_of_week
FROM course_schedule cs
         JOIN course c   ON c.course_id = cs.course_id
         JOIN time_slot ts ON ts.time_slot_id = cs.time_slot_id;

-- 자주 쓰는 인덱스
ALTER TABLE course_schedule
    ADD KEY ix_cs_sec (sec_id),
  ADD KEY ix_cs_sec_course (sec_id, course_id),
  ADD KEY ix_cs_sec_day (sec_id, day_of_week);