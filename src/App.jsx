import "antd/dist/reset.css";
import "./index.css";
import CreateOther from "@/components/CreateOther";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <CreateOther />
      <ToastContainer
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick={true} 
        rtl={false} 
        pauseOnFocusLoss={false} 
        draggable={false} 
        pauseOnHover={true} 
      />
      ;
    </div>
  );
}

export default App;
