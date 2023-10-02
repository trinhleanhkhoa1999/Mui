import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
    <App />
  </SnackbarProvider>
);
