import { useEffect, useState } from "react"
import "./FamilyProfiles.css"
import { getPatientsAPI } from "../../services/patientService.js"  

export default function FamilyProfiles({ refreshKey, onSelect, selectedId }) {
  const [profiles, setProfiles] = useState([])

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatientsAPI()

        const mapped = res.map((p) => ({
          id: p.ID,
          name: p.FULL_NAME,
          code: `UMC-${p.ID}`,
          role: relationLabel[p.RELATION] || p.RELATION,
          avatar: `https://i.pravatar.cc/80?u=${p.ID}`,
          raw: p
        }))

        setProfiles(mapped)
        if (mapped.length > 0) {
          onSelect(mapped[0].raw)
        }

      } catch (err) {
        console.error(err)
      }
    }
    fetchPatients()
  }, [refreshKey])
  
  const relationLabel = {
    self: "Bản thân",
    father: "Cha",
    mother: "Mẹ",
    grandfather: "Ông",
    grandmother: "Bà",
    husband: "Chồng",
    wife: "Vợ",
    brother: "Anh/Em trai",
    sister: "Chị/Em gái",
    child: "Con",
    grandchild: "Cháu",
    other: "Khác"
  }

  return (
    <div className="container-profiles py-4">
      <div className="d-flex gap-3 overflow-auto">
        {profiles.map((p) => (
          <div
            key={p.id}
            className={`profile-card ${
              selectedId === p.id ? "active" : ""
            }`}
            onClick={() => onSelect(p.raw)} 
          >
            <img src={p.avatar} className="profile-avatar" />

            <span className="profile-role">{p.role}</span>

            <div className="profile-name">{p.name}</div>
            <div className="profile-id">ID: {p.code}</div>
          </div>
        ))}
      </div>
    </div>
  )
}