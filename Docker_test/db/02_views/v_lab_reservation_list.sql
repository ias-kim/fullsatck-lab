CREATE OR REPLACE VIEW v_reservation_list AS
SELECT
    r.reservation_id,
    r.user_id,
    ua.name AS reserved_by,
    r.classroom_id,
    cr.building,
    cr.room_number,
    r.title AS reservation_title,
    r.start_at,
    r.end_at,
    r.status
FROM reservation r
         JOIN user_account ua ON ua.user_id = r.user_id
         JOIN classroom cr    ON cr.classroom_id = r.classroom_id
WHERE cr.room_type = 'LAB';

ALTER TABLE reservation
    ADD KEY IF NOT EXISTS ix_resv_room_start_end (classroom_id, start_at, end_at),
    ADD KEY IF NOT EXISTS ix_resv_status_time    (status, start_at),
    ADD KEY IF NOT EXISTS ix_resv_user_time      (user_id, start_at);