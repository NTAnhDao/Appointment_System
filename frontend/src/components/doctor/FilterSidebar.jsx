import { useEffect, useState } from "react";
import { getDepartmentsAPI } from "../../services/DoctorService";

export default function FilterSidebar({ selectedDept, setSelectedDept }) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await getDepartmentsAPI();
            setDepartments(data);
        }
        load();
    }, []);

    const toggleDept = (id) => {
        if (selectedDept.includes(id)) {
            setSelectedDept(selectedDept.filter(d => d !== id));
        } else {
            setSelectedDept([...selectedDept, id]);
        }
    };

    const clearFilter = () => {
        setSelectedDept([]);
    };

    return (
        <div className="p-4 rounded-4 bg-soft">
            <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-bold">Bộ lọc</h6>
                <button className="btn btn-sm text-primary-customer" onClick={clearFilter}>
                    Xóa
                </button>
            </div>

            <div className="mb-4">
                <label className="fw-bold small text-primary-customer mb-2">
                    CHUYÊN KHOA
                </label>

                {departments.map(dep => (
                    <div className="form-check" key={dep.DEPARTMENT_ID}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedDept.includes(dep.DEPARTMENT_ID)}
                            onChange={() => toggleDept(dep.DEPARTMENT_ID)}
                        />
                        <label className="form-check-label">
                            {dep.NAME}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}