-- 관리 화면용 뷰(검색/목록)
CREATE OR REPLACE VIEW v_allowed_email AS
SELECT
    id,
    email,
    COALESCE(reason,'') AS reason,
    COALESCE(tag,'')    AS tag
FROM allowed_email;

-- 고유성 + 빠른 LIKE 검색을 위해 email 인덱스(UNIQUE 이미 있음)
ALTER TABLE allowed_email
    ADD COLUMN IF NOT EXISTS created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                                                  ADD CONSTRAINT chk_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');