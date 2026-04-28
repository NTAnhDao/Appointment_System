import { useState } from "react";
import FamilyProfiles from "../components/patients/FamilyProfiles";
import MainLayout from "../components/layout/MainLayout";
import PatientForm from "../components/patients/PatientForm";
import "../styles/profiles.css";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
    setSelected(null);
    setSelectedId(null);
    setIsCreating(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"  
    })
  };

  const handleSelect = (p) => {
    setSelected(p);
    setSelectedId(p.ID);
    setIsCreating(false); 
  };

  const handleCancel = () => {
    setIsCreating(false)

    window.scrollTo({
      top: 0,
      behavior: "smooth"  
    })
  }

  return (
    <MainLayout>
      <div className="profiles-page-container py-4">
        {/* Header */}
        {!isCreating && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="profile-header">Hồ sơ gia đình</h2>

            <button
              className="btn btn-add-profile"
              onClick={() => {
                setSelected(null);     
                setSelectedId(null);   
                setIsCreating(true);    
              }}
            >
              <span className="material-symbols-outlined">add</span>
              Thêm hồ sơ
            </button>
          </div>
          
        )}

        {/* ẨN LIST */}
        {!isCreating && (
          <FamilyProfiles
            refreshKey={refreshKey}   
            onSelect={handleSelect}
            selectedId={selectedId}
          />
        )}

        {/* FORM */}
        <PatientForm
          selectedPatient={selected}
          onSuccess={refresh}
          onCancel={handleCancel} 
        />
      </div>
    </MainLayout>
  );
}