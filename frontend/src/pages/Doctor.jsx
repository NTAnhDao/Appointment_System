import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import FilterSidebar from "../components/doctor/FilterSidebar";
import DoctorList from "../components/doctor/DoctorList";
import Pagination from "../components/doctor/Pagination";
import "../styles/doctor.css";

export default function Doctor() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 3;

    const doctors = [
        { name: "Nguyễn Thanh A", specialty: "Tim mạch", exp: 25, price: "500.000đ", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPWHo93oMV7dKaU0n5SY-2qQsW0kx7aRjbxqO3VuJcwCQ4brp8lFx2TozvfRWdT87anvBFHPmhuie85I8pUySS37r7YrB2_x4lJLDw619ISrIm5ioCNO_krl-vpztVF3j6QX3UIg5Xjt4dek2coubcVk7KKZuKNQMRjaJ8v68HUaGJlEWWvmor5Orldv16uyN8WdbA5v3hjiI62zxcZWQ7swKDpawbBLh27cgTObZAE1yGe4PBhxow9HkEtQQr38nOa7kiugjamIYL", description: "Chuyên gia tim mạch" },
        { name: "Trần Thị B", specialty: "Nhi khoa", exp: 12, price: "300.000đ", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYYdCpTeQl8kocwoQc0KYDbcyRd2JCtwq98ry7Ho7OLB8DUnPWGMalTBfWBuTtPwfW7DScM1mUMnwxEU0Q8Y1F2GmHFTzPpW5wsVphJOM7AXf4aVOCaQ_XVwIFNpIRgr-7PRtEjCpZVZUJa_XcjQSScAz_5grD_TQQCXSybmuZS7KaWIxTtVctpms_NEt_YwzwigyyC2VlnwTN4Dw_yg1PBA97DZD-OXgXs7MXfo3LYgidvip_Dmi6fNIUUySoJ1woCZ278iz_QBDR", description: "Bác sĩ nhi tận tâm" },
        { name: "Lê Văn C", specialty: "Nội tổng quát", exp: 30, price: "450.000đ", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxtGGvk4_2ouBdwKt1LsO7L3QkXxs20FlpADO-2bEOD812hb-QvPNmM4JNxL6Qhj5p_qycsFdJqS_gG198NZeCINyb6wN2eQFtNoz7n4NtMyfCWYjWcpRcwgNaKxM5CVAfRkYKknDGr0vwLomBLwqqSFeJU15M3VfTpKao3VYM4BTIp14NkRefDNw5kszLcgIYvZEuHHKE7ngcNlQlCeep2BfpBjVMTVdFvZUg7yvdHAAYldamdkHcgGLD2x0jCUe4maBnsBo-EU5M", description: "Chuyên gia bệnh mãn tính" },
        { name: "Phạm Minh D", specialty: "Da liễu", exp: 15, price: "400.000đ", image: "https://via.placeholder.com/150", description: "Điều trị da chuyên sâu" },
        { name: "Hoàng Lan E", specialty: "Sản phụ khoa", exp: 18, price: "550.000đ", image: "https://via.placeholder.com/150", description: "Chăm sóc phụ nữ" },
        { name: "Đỗ Quốc F", specialty: "Thần kinh", exp: 20, price: "600.000đ", image: "https://via.placeholder.com/150", description: "Chuyên gia thần kinh" },
    ];


    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentDoctors = doctors.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(doctors.length / perPage);

    return (
        <MainLayout>
            <div class="specialties py-5 px-4">
                <div class="max-w-2xl">
                    <h2 class="fw-bold text-primary-customer mb-4">Đội ngũ Chuyên gia</h2>
                    <p class="text-lg">Kết nối với những bác sĩ hàng đầu tại Việt Nam, mang đến sự an tâm và tận tâm trong từng lượt khám.</p>
                </div>
                <div className="row g-4">
                    <div className="col-lg-3">
                        <FilterSidebar />
                    </div>

                    <div className="col-lg-9">
                        <DoctorList doctors={currentDoctors} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}