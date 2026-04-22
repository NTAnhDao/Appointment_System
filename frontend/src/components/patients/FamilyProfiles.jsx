import "./FamilyProfiles.css";
export default function FamilyProfiles() {
  const profiles = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      code: "UMC-88291",
      role: "Chủ hồ sơ",
      active: true,
      avatar: "https://i.pravatar.cc/80?img=1",
    },
    {
      id: 2,
      name: "Trần Thị Bé",
      code: "UMC-10293",
      role: "Bà",
      avatar: "https://i.pravatar.cc/80?img=5",
    },
    {
      id: 3,
      name: "Nguyễn Minh Khôi",
      code: "UMC-99201",
      role: "Con",
      avatar: "https://i.pravatar.cc/80?img=8",
    },
  ];

  return (
    <div className="container-profiles py-4">

      {/* List */}
      <div className="d-flex gap-3 overflow-auto">
        {profiles.map((p) => (
          <div
            key={p.id}
            className={`profile-card ${p.active ? "active" : ""}`}
          >
            {/* Avatar */}
            <img src={p.avatar} className="profile-avatar" />

            {/* Role */}
            <span className="profile-role">{p.role}</span>

            {/* Info */}
            <div className="profile-name">{p.name}</div>
            <div className="profile-id">ID: {p.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
}