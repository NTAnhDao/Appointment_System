import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
        />
      </BrowserRouter>
    </BookingProvider>

  );
}

export default App;