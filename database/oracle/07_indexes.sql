CONNECT app/123456@XEPDB1;

CREATE INDEX idx_patient_phone ON patient(phone);
CREATE INDEX idx_patient_guardian ON patient(guardian_id);
CREATE INDEX idx_patient_user ON patient(user_id);


CREATE INDEX idx_app_user ON appointments(user_id);
CREATE INDEX idx_app_status_expire
ON appointments(status, expired_at);