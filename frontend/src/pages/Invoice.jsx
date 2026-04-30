import MainLayout from "../components/layout/MainLayout";
import InvoiceDetail from "../components/appointment/InvoiceDetail";

export default function Invoice() {
    return (
        <MainLayout>
            <div className="container py-5 px-4">
                <InvoiceDetail />
            </div>
        </MainLayout>
    )
}