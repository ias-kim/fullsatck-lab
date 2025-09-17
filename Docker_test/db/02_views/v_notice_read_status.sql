CREATE OR REPLACE VIEW v_notice_read_status AS
SELECT
    ndn.notice_id,
    ndn.user_id,
    ua.name AS student_name,
    ndn.status,
    ndn.read_at,
    ndn.send_at
FROM notification_delivery_notice ndn
         JOIN user_account ua ON ndn.user_id = ua.user_id

--- 요약 뷰
CREATE OR REPLACE VIEW v_notice_read_summary AS
SELECT
    c.sec_id,
    n.notice_id,
    COUNT(*) AS sent_cnt,
    SUM(read_at IS NOT NULL) AS read_cnt,
    SUM(read_at IS NULL)     AS unread_cnt
FROM notice n
         JOIN course c ON c.course_id = n.course_id
         JOIN notification_delivery_notice d ON d.notice_id = n.notice_id
GROUP BY c.sec_id, n.notice_id;

-- 각 공지에 대한 개인별 수신행 유니크 보장 + 조회 성능
ALTER TABLE notification_delivery_notice
    ADD UNIQUE KEY uk_notice_user (notice_id, user_id),
    ADD KEY ix_ndn_user_read (user_id, read_at),
    ADD KEY ix_ndn_notice (notice_id),
    ADD KEY ix_ndn_status (status);  -- status 컬럼을 쓰면


-- :notice_id 에는 보고자 하는 공지사항의 ID를 넣습니다.
SELECT student_name, status, read_at
FROM v_notice_read_status
WHERE notice_id = :notice_id
ORDER BY student_name;

-- :current_user_id 에는 현재 로그인한 학생의 ID를 넣습니다.
-- :notice_id 에는 현재 보고 있는 공지의 ID를 넣습니다.


-- 읽음 처리 (이미 읽었으면 NOOP)
UPDATE notification_delivery_notice
SET read_at = NOW(), status = 'read'
WHERE notice_id = :notice_id
  AND user_id  = :current_user_id
  AND read_at IS NULL;