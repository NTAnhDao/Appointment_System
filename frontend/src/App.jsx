import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
       <ToastContainer
        position="top-right"
        autoClose={2000}   
        hideProgressBar
      />
    </BrowserRouter>
  );
}

export default App;