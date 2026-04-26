import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import Pagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";

export default function DoctorList({ doctors, onSelectDoctor }) {
    const PAGE_SIZE = 3;

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
    const [selectedDept, setSelectedDept] = useState([]);

    // 👉 filter theo chuyên khoa
    useEffect(() => {
        let data = doctors;

        if (selectedDept.length > 0) {
            data = doctors.filter(doc =>
                selectedDept.includes(doc.departmentId)
            );
        }

        setFilteredDoctors(data);
        setCurrentPage(1); // reset page khi filter
    }, [selectedDept, doctors]);

    // 👉 pagination fake
    const totalPages = Math.ceil(filteredDoctors.length / PAGE_SIZE);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentDoctors = filteredDoctors.slice(
        startIndex,
        startIndex + PAGE_SIZE
    );

    return (
        <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
                <FilterSidebar
                    selectedDept={selectedDept}
                    setSelectedDept={setSelectedDept}
                />
            </div>

            {/* List */}
            <div className="col-md-9">
                <div className="d-flex flex-column gap-4">
                    {currentDoctors.map((doc) => (
                        <DoctorCard key={doc.id} doctor={doc} onSelectDoctor={onSelectDoctor}/>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}