import AppointmentList from "../components/appointment/AppointmentList";
import MainLayout from "../components/layout/MainLayout";

export default function AppointmentPage() {
  return (
    <MainLayout>
      <div className="container py-4">
        <AppointmentList />
      </div>
    </MainLayout>
  );
}