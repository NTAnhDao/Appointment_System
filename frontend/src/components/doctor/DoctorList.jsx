import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors }) {
    return (
        <div className="d-flex flex-column gap-4">
            {doctors.map((doc, i) => (
                <DoctorCard key={i} doctor={doc} />
            ))}
        </div>
    );
}