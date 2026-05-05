CONNECT app/123456@XEPDB1;

CREATE OR REPLACE PROCEDURE proc_expire_appointments AS
BEGIN
    UPDATE appointments
    SET status = 'cancelled'
    WHERE status = 'pending'
      AND expired_at < SYSTIMESTAMP AT TIME ZONE 'UTC';

    COMMIT;
END;
/

BEGIN
  DBMS_SCHEDULER.CREATE_JOB (
    job_name        => 'JOB_EXPIRE_APPOINTMENT',
    job_type        => 'STORED_PROCEDURE',
    job_action      => 'APP.PROC_EXPIRE_APPOINTMENTS',
    repeat_interval => 'FREQ=MINUTELY;INTERVAL=1',
    enabled         => TRUE
  );
END;
/
SELECT job_name, status, actual_start_date, run_duration
FROM user_scheduler_job_run_details
ORDER BY log_date DESC;

SELECT COUNT(*) 
FROM appointments
WHERE status = 'pending'
  AND expired_at < SYSTIMESTAMP AT TIME ZONE 'UTC';

SELECT expired_at, SYSTIMESTAMP AT TIME ZONE 'UTC'
FROM appointments
ORDER BY expired_at DESC;