CREATE OR REPLACE VIEW v_schedule_target AS
SELECT
    cs.schedule_id,
    cs.sec_id,
    cs.course_id,
    c.title                  AS course_title,
    c.is_special,            -- FALSE=정규, TRUE=특강
    cs.day_of_week,          -- 'MON'..'FRI'
    ts.start_time,
    ts.end_time,
    cr.classroom_id,
    CONCAT(cr.building, '-', cr.room_number) AS classroom_name,
    ct.grade_id,             -- 정규 과목이면 사용
    ct.level_id,             -- 특강이면 사용
    cl.language_id           -- 언어 타겟(없으면 NULL)
FROM course_schedule cs
         JOIN time_slot ts      ON ts.time_slot_id   = cs.time_slot_id
         JOIN classroom cr      ON cr.classroom_id   = cs.classroom_id
         JOIN course c          ON c.course_id       = cs.course_id
         LEFT JOIN course_target   ct ON ct.course_id = cs.course_id
         LEFT JOIN course_language cl ON cl.course_id = cs.course_id;

ALTER TABLE course_schedule   ADD KEY ix_cs_course   (course_id), ADD KEY ix_cs_timeslot (time_slot_id), ADD KEY ix_cs_room (classroom_id);
ALTER TABLE course_target     ADD KEY ix_ct_course   (course_id), ADD KEY ix_ct_grade    (grade_id),     ADD KEY ix_ct_level (level_id);
ALTER TABLE course_language   ADD KEY ix_cl_course   (course_id), ADD KEY ix_cl_language (language_id);
ALTER TABLE time_slot         ADD KEY ix_ts_time (start_time, end_time);

--
-- WITH days AS (
--     -- 1. 날짜 오류 수정: 실제 날짜 값을 사용해야 합니다.
--     SELECT DATE(:week_start) AS d
-- UNION ALL
-- SELECT DATE_ADD(d, INTERVAL 1 DAY) FROM days WHERE d < DATE(:week_end) - INTERVAL 1 DAY
--     ),
--     days_map AS (
-- SELECT d,
--     CASE DAYOFWEEK(d)
--     WHEN 2 THEN 'MON' WHEN 3 THEN 'TUE' WHEN 4 THEN 'WED'
--     WHEN 5 THEN 'THU' WHEN 6 THEN 'FRI' WHEN 7 THEN 'SAT' ELSE 'SUN' END AS dow
-- FROM days
--     ),
--     planned AS (
-- SELECT dm.d AS class_date, st.*
-- FROM v_schedule_target st
--     JOIN days_map dm ON dm.dow = st.day_of_week
--     AND dm.d BETWEEN st.start_date AND st.end_date
-- -- 2. 따옴표 오류 수정: 문자열 값에는 따옴표를 붙여야 합니다.
-- WHERE (st.is_special = FALSE AND st.grade_id = :grade_id)
--    OR (st.is_special = TRUE)
--     ),
--     evt AS (
-- SELECT ce.schedule_id, ce.event_type, ce.event_date
-- FROM course_event ce
-- WHERE ce.event_date >= DATE(:week_start) AND ce.event_date < DATE(:week_end)
--     ),
--     planned_effective AS (
-- SELECT p.*
-- FROM planned p
--     LEFT JOIN evt e
-- ON e.schedule_id = p.schedule_id AND e.event_date = p.class_date AND e.event_type = 'CANCEL'
-- WHERE e.schedule_id IS NULL
--     ),
--     makeups AS (
-- SELECT e.event_date AS class_date, st.*
-- FROM evt e
--     JOIN v_schedule_target st ON st.schedule_id = e.schedule_id
-- WHERE e.event_type='MAKEUP'
--     )
-- SELECT class_date, day_of_week, start_time, end_time,
--        classroom_id, classroom_name, course_id, course_title, is_special, 'PLANNED' AS source
-- FROM planned_effective
-- UNION ALL
-- SELECT m.class_date,
--        CASE DAYOFWEEK(m.class_date)
--            WHEN 2 THEN 'MON' WHEN 3 THEN 'TUE' WHEN 4 THEN 'WED'
--            WHEN 5 THEN 'THU' WHEN 6 THEN 'FRI' WHEN 7 THEN 'SAT' ELSE 'SUN' END,
--        st.start_time, st.end_time,
--        st.classroom_id, st.classroom_name, st.course_id, st.course_title, st.is_special, 'MAKEUP'
-- FROM makeups m
--          JOIN v_schedule_target st ON st.schedule_id = m.schedule_id
-- ORDER BY class_date, start_time, course_title;