CREATE OR REPLACE TRIGGER app.TRG_PAYMENT_UPDATED
BEFORE UPDATE ON app.PAYMENTS
FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSDATE;
END;
/

-- TRIGGER KIỂM TRA SLOT KHI ĐẶT LỊCH HẸN --
CREATE OR REPLACE TRIGGER trg_check_schedule_slot
BEFORE INSERT ON app.appointments
FOR EACH ROW
DECLARE
    v_booked NUMBER;
    v_max NUMBER;
BEGIN
    SELECT booked_count, max_patients
    INTO v_booked, v_max
    FROM app.schedule
    WHERE schedule_id = :NEW.schedule_id
    FOR UPDATE;

    IF v_booked >= v_max THEN
        RAISE_APPLICATION_ERROR(-20001, 'Schedule is full');
    END IF;

    -- tăng slot
    UPDATE app.schedule
    SET booked_count = booked_count + 1
    WHERE schedule_id = :NEW.schedule_id;
END;
/
-- TRIGGER HỦY LỊCH HẸN --
CREATE OR REPLACE TRIGGER trg_cancel_appointment
AFTER UPDATE OF status ON app.appointments
FOR EACH ROW
BEGIN
    IF :OLD.status != 'CANCELLED' AND :NEW.status = 'CANCELLED' THEN
        UPDATE app.schedule
        SET booked_count = booked_count - 1
        WHERE schedule_id = :OLD.schedule_id;
    END IF;
END;
/
CREATE OR REPLACE TRIGGER trg_reduce_slot_on_expire
AFTER UPDATE OF status ON app.appointments
FOR EACH ROW
BEGIN
    IF :OLD.status = 'PENDING' AND :NEW.status = 'EXPIRED' THEN
        UPDATE app.schedule
        SET booked_count = booked_count - 1
        WHERE schedule_id = :OLD.schedule_id;
    END IF;
END;
/
