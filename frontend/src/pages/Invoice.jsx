import MainLayout from "../components/layout/MainLayout";
import InvoiceDetail from "../components/appointment/InvoiceDetail";
import { getInvoiceDetailAPI } from "../services/InvoiceService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Invoice() {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const data = await getInvoiceDetailAPI(id);
                console.log("Fetched invoice data:", data);
                setInvoiceData(data);
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            }
        };

        fetchInvoiceData();
    }, [id]);

    return (
        <MainLayout>
            <div className="container py-5 px-4">
                <InvoiceDetail invoice={invoiceData?.data} />
            </div>
        </MainLayout>
    )
}