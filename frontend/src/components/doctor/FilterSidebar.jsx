export default function FilterSidebar() {
    return (
        <div className="p-4 rounded-4 bg-soft">
            <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-bold">Bộ lọc</h6>
                <button className="btn btn-sm text-primary-customer">Xóa</button>
            </div>

            <div className="mb-4">
                <label className="fw-bold small text-primary-customer mb-2">CHUYÊN KHOA</label>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">Tim mạch</label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">Nhi khoa</label>
                </div>
            </div>
        </div>
    );
}