import FamilyProfiles from "../components/profiles/FamilyProfiles";
import MainLayout from "../components/layout/MainLayout";

export default function ProfilesPage() {
  return (
    <MainLayout>
      <div className="container py-4">
        <FamilyProfiles />
      </div>
    </MainLayout>
  );
}
0