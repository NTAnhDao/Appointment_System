CONNECT app/123456@XEPDB1;

CREATE OR REPLACE TRIGGER TRG_PAYMENT_UPDATED
BEFORE UPDATE ON PAYMENTS
FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSTIMESTAMP;
END;
/

-- TRIGGER KIỂM TRA SLOT KHI ĐẶT LỊCH HẸN --
CREATE OR REPLACE TRIGGER trg_check_schedule_slot
BEFORE INSERT ON appointments
FOR EACH ROW
DECLARE
    v_booked NUMBER;
    v_max NUMBER;
BEGIN
    SELECT booked_count, max_patients
    INTO v_booked, v_max
    FROM schedule
    WHERE schedule_id = :NEW.schedule_id
    FOR UPDATE;

    IF v_booked >= v_max THEN
        RAISE_APPLICATION_ERROR(-20001, 'Schedule is full');
    END IF;

    -- tăng slot
    UPDATE schedule
    SET booked_count = booked_count + 1
    WHERE schedule_id = :NEW.schedule_id;
END;
/

CREATE OR REPLACE TRIGGER trg_reduce_slot_on_expire
AFTER UPDATE OF status ON appointments
FOR EACH ROW
BEGIN
    -- xử lý khi từ pending -> cancelled
    IF LOWER(:OLD.status) = 'pending' 
       AND LOWER(:NEW.status) = 'cancelled' THEN

        -- 1. giảm slot
        UPDATE schedule
        SET booked_count = GREATEST(booked_count - 1, 0)
        WHERE schedule_id = :OLD.schedule_id;

        -- 2. cancel invoice (khi chưa thanh toán)
        UPDATE invoices
        SET status = 'CANCELLED'
        WHERE appointment_id = :OLD.appointment_id
          AND status = 'UNPAID';

    END IF;
END;
/