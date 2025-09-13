CREATE OR REPLACE VIEW v_notice_read_status AS
SELECT
    ndn.notice_id,
    ndn.user_id,
    ua.name AS student_name,
    ndn.status,
    ndn.read_at,
    ndn.send_at
FROM notification_delivery_notice ndn
         JOIN user_account ua ON ndn.user_id = ua.user_id;

-- :notice_id 에는 보고자 하는 공지사항의 ID를 넣습니다.
SELECT student_name, status, read_at
FROM v_notice_read_status
WHERE notice_id = :notice_id
ORDER BY student_name;

-- :current_user_id 에는 현재 로그인한 학생의 ID를 넣습니다.
-- :notice_id 에는 현재 보고 있는 공지의 ID를 넣습니다.

UPDATE notification_delivery_notice
SET read_at = NOW()
WHERE notice_id = :notice_id
  AND user_id = :current_user_id
  AND read_at IS NULL; -- 아직 읽지 않은 경우에만 업데이트 (성능 최적화)