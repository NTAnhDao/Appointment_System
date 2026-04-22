import { useState } from "react";
import FamilyProfiles from "../components/patients/FamilyProfiles";
import MainLayout from "../components/layout/MainLayout";
import PatientForm from "../components/patients/PatientForm";
import "../styles/profiles.css";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
    setSelected(null);
  };

  return (
    <MainLayout>
      <div className="profiles-page-container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="profile-header">Hồ sơ gia đình</h5>

          <button className="btn btn-add-profile">
            <span className="material-symbols-outlined">add</span>
            Thêm hồ sơ
          </button>
        </div>

        <FamilyProfiles

        />

        <PatientForm
          selectedPatient={selected}
          onSuccess={refresh}
        />
      </div>
    </MainLayout>
  );
}