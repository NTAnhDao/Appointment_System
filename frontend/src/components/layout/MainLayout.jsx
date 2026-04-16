import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout({ children }) {
    return (
        <div className="min-vh-100 d-flex flex-column">
            {/* HEADER */}
            <Header />
            {/* MAIN */}
            <main className="flex-grow-1 py-5">{children}</main>
            {/* FOOTER */}
            <Footer />
        </div>
    );
}